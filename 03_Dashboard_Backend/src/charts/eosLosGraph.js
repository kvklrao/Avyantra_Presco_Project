const { sequelize } = require('../sequelize');
var jwt_decode = require("jwt-decode");
const DashboardUser = require('../models/dashboardUser');

const eosLosGraph = async (req, res) => {

  let range = req.query.range;// 0 - dates query,1- weekly,2-monthly,3,quarterly,4 yearly
  let fromDate = req.query.date_from;
  let toDate = req.query.date_to;

  const token = req.header('Authorization').replace('Bearer ', '')
  var decoded = jwt_decode(token);

  var mail = decoded.name;
  const user = await DashboardUser.findOne({ where: { email: mail } });

  let all_hospitals = req.query.all_hospitals;
  let all_branches = req.query.all_branches;
  console.log(req.query.hospital_id, req.query.hospital_id)
  if (all_hospitals == 1 && (req.query.hospital_id == "" || req.query.hospital_id == undefined)) {
    console.log("all_hospitals")
    var hospital_query = "";
  } else {
    if (req.query.hospital_id == "") {
      var hospital_query = "and pbi.hospital_id= " + user.hospital_id;
    } else {
      var hospital_query = "and pbi.hospital_id = " + req.query.hospital_id;
    }

  }

  if (all_branches == 1 && (req.query.branch_id == "" || req.query.branch_id == undefined)) {
    console.log("all_branches")
    var branch_query = "";
  } else {
    if (req.query.branch_id == "") {
      var branch_query = "and pbi.hospital_branch_id=" + user.hospital_branch_id;
    } else {
      var branch_query = "and pbi.hospital_branch_id =" + req.query.branch_id;
    }

  }


  if (range == 0 || range == 1) {
    const [results, metadata] = await sequelize.query(`select baby_adm_date, sum(case when IsSepsisPositive = 1 then 1 else 0 end) as sepsis_positive_count,
    sum(case when IsSepsisPositive = 0 then 1 else 0 end) sepsis_negative_count,
    sum(case when IsEOS = 1 then 1 else 0 end) as eos_count,
    sum(case when IsEOS = 0 then 1 else 0 end) as los_count,
    hospital_id,hospital_branch_id from (SELECT
    pbi.id,
    str_to_date(pgi.baby_date_of_admission, '%d/%m/%Y') as baby_adm_date,
    pgi.baby_condition_yes_eos_los,
    pbi.hospital_id as hospital_id,
    pbi.hospital_branch_id as hospital_branch_id,
    pbi.baby_medical_record_number ,
    case when
    sum(case when pbin.blood_culture_report = 'Positive' then 1 else 0 end) >0 then 1 else 0 end as IsSepsisPositive,
    case when
    sum(case when pgi.baby_condition_yes_eos_los = 'Eos' then 1 else 0 end) >0 then 1 else 0 end as IsEOS
    FROM
    patient_general_infos pgi
    JOIN
    patient_baby_investigations pbin ON pbin.study_id = pgi.study_id
    join patient_basic_infos pbi on pbi.id = pgi.study_id
    join patient_maternal_infos pmi on pmi.study_id = pbi.id
    join m_hospitals mh on pbi.hospital_id = mh.hospital_id
    where 
    pbin.blood_culture_report <> 'NA' and
    str_to_date(pgi.baby_date_of_admission, '%d/%m/%Y') between '${fromDate}' and '${toDate}'
    and mh.active_flag = 1
    ${hospital_query}
    ${branch_query}
    and pbin.blood_culture_report = 'Positive'
    group by
    pbi.id,
    baby_adm_date,
    pgi.baby_condition_yes_eos_los,
    pbi.hospital_id,
    pbi.hospital_branch_id,
    pbi.baby_medical_record_number) a
    group by a.baby_adm_date`, {
    });

    res.json({ results });
  }
  else {

    console.log("here in 2");
    if (range == 2) {
      var chartType = 'week';
      console.log("here in x");
    }
    else if (range == 3) { var chartType = 'month'; console.log("here in y"); }
    else if (range == 4) { var chartType = 'year'; console.log("here in z"); }

    const [results2, metadata] = await sequelize.query(`select baby_adm_date, sum(case when IsSepsisPositive = 1 then 1 else 0 end) as sepsis_positive_count,
    sum(case when IsSepsisPositive = 0 then 1 else 0 end) sepsis_negative_count,
     ${chartType},
    sum(case when IsEOS = 1 then 1 else 0 end) as eos_count,
    sum(case when IsEOS = 0 then 1 else 0 end) as los_count,
    hospital_id,hospital_branch_id from (SELECT
    pbi.id,
     ${chartType}(str_to_date(pgi.baby_date_of_admission, '%d/%m/%Y')) as ${chartType},
    str_to_date(pgi.baby_date_of_admission, '%d/%m/%Y') as baby_adm_date,
    pgi.baby_condition_yes_eos_los,
    pbi.hospital_id as hospital_id,
    pbi.hospital_branch_id as hospital_branch_id,
    pbi.baby_medical_record_number ,
    case when
    sum(case when pbin.blood_culture_report = 'Positive' then 1 else 0 end) >0 then 1 else 0 end as IsSepsisPositive,
    case when
    sum(case when pgi.baby_condition_yes_eos_los = 'Eos' then 1 else 0 end) >0 then 1 else 0 end as IsEOS
    FROM
    patient_general_infos pgi
    JOIN
    patient_baby_investigations pbin ON pbin.study_id = pgi.study_id
    join patient_basic_infos pbi on pbi.id = pgi.study_id
    join patient_maternal_infos pmi on pmi.study_id = pbi.id
    join m_hospitals mh on pbi.hospital_id = mh.hospital_id
    where 
    pbin.blood_culture_report <> 'NA' and
    str_to_date(pgi.baby_date_of_admission, '%d/%m/%Y') between '${fromDate}' and '${toDate}'
    and mh.active_flag = 1
    ${hospital_query}
    ${branch_query}
    and pbin.blood_culture_report = 'Positive'
    group by
    pbi.id,
    ${chartType}(str_to_date(pgi.baby_date_of_admission, '%d/%m/%Y')),
    pgi.baby_condition_yes_eos_los,
    pbi.hospital_id,
    pbi.hospital_branch_id,
    pbi.baby_medical_record_number) a
    group by a.${chartType}`, {
    });
    console.log("here in 3");
    res.json({ results2 });
  }

};

module.exports = eosLosGraph;




