const { sequelize } = require('../sequelize');
var jwt_decode = require("jwt-decode");
const DashboardUser = require('../models/dashboardUser');

const cardsCount = async (req, res) => {

  let range = req.query.range;// 0 - dates query,1- weekly,2-monthly,3,quarterly,4 yearly
  let fromDate = req.query.date_from;
  let toDate = req.query.date_to;

  const token = req.header('Authorization').replace('Bearer ', '')
  var decoded = jwt_decode(token);

  var mail = decoded.name;
  const user = await DashboardUser.findOne({ where: { email: mail } });

  console.log(req.is_primary_user, "primaryyyy");

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
    const [results, metadata] = await sequelize.query(`select a.baby_adm_date,
    b.count_of_admitted,
    b.discharge_count,
    sum(case when IsSepsisPositive = 1 then 1 else 0 end) as count_of_sepsis_positive,
    sum(case when IsSepsisPositive = 0 then 1 else 0 end) count_of_sepsis_negative
    from 
    (select  str_to_date(pgi.baby_date_of_admission, '%d/%m/%Y') as baby_adm_date,
    case when
    sum(case when pbin.blood_culture_report = 'Positive' then 1 else 0 end) >0 then 1 else 0 end as IsSepsisPositive
    from 
    patient_basic_infos pbi left join
    patient_general_infos pgi on pbi.id = pgi.study_id 
    left join patient_baby_investigations pbin on pbin.study_id = pbi.id
    left join m_hospitals mh on mh.hospital_id = pbi.hospital_id 
    where mh.active_flag =1  ${hospital_query}
        ${branch_query} and
    str_to_date(pgi.baby_date_of_admission, '%d/%m/%Y') between '${fromDate}' and '${toDate}'
    and pbin.blood_culture_report <> 'NA'
    group by 
    pbi.id,
    str_to_date(pgi.baby_date_of_admission, '%d/%m/%Y'),
    pbi.hospital_id,
    pbi.hospital_branch_id) as a join 
    (   
    select  str_to_date(pgi.baby_date_of_admission, '%d/%m/%Y') as baby_adm_date,
    count(DISTINCT pbi.baby_medical_record_number) count_of_admitted,
    count( DISTINCT (case when pbf.baby_discharge_date <>'NA' then pbf.study_id 
        else null end))  as discharge_count
    from patient_basic_infos pbi 
    left join patient_general_infos pgi on pbi.id = pgi.study_id 
    left join m_hospitals mh on pbi.hospital_id  = mh.hospital_id
    left join patient_baby_finals pbf on pbi.id = pbf.study_id 
    where mh.active_flag =1  ${hospital_query}
        ${branch_query} and
    str_to_date(pgi.baby_date_of_admission, '%d/%m/%Y') between '${fromDate}' and '${toDate}'
    group by str_to_date(pgi.baby_date_of_admission, '%d/%m/%Y')
     ) as b on a.baby_adm_date=b.baby_adm_date`, {
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

    const [results2, metadata] = await sequelize.query(`select a.${chartType},
    b.count_of_admitted,
    b.discharge_count,
    sum(case when IsSepsisPositive = 1 then 1 else 0 end) as count_of_sepsis_positive,
    sum(case when IsSepsisPositive = 0 then 1 else 0 end) count_of_sepsis_negative
    from 
    (select  ${chartType}(str_to_date(pgi.baby_date_of_admission, '%d/%m/%Y')) as ${chartType},
    case when
    sum(case when pbin.blood_culture_report = 'Positive' then 1 else 0 end) >0 then 1 else 0 end as IsSepsisPositive
    from 
    patient_basic_infos pbi left join
    patient_general_infos pgi on pbi.id = pgi.study_id 
    left join patient_baby_investigations pbin on pbin.study_id = pbi.id
    left join m_hospitals mh on mh.hospital_id = pbi.hospital_id 
    where mh.active_flag =1  ${hospital_query}
        ${branch_query} and
    str_to_date(pgi.baby_date_of_admission, '%d/%m/%Y') between '${fromDate}' and '${toDate}'
    and pbin.blood_culture_report <> 'NA'
    group by 
    pbi.id,
    ${chartType}(str_to_date(pgi.baby_date_of_admission, '%d/%m/%Y')),
    pbi.hospital_id,
    pbi.hospital_branch_id) as a join 
    (   
    select  ${chartType}(str_to_date(pgi.baby_date_of_admission, '%d/%m/%Y')) as ${chartType},
    count(DISTINCT pbi.baby_medical_record_number) count_of_admitted,
    count( DISTINCT (case when pbf.baby_discharge_date <>'NA' then pbf.study_id 
        else null end))  as discharge_count
    from patient_basic_infos pbi 
    left join patient_general_infos pgi on pbi.id = pgi.study_id 
    left join m_hospitals mh on pbi.hospital_id  = mh.hospital_id
    left join patient_baby_finals pbf on pbi.id = pbf.study_id 
    where mh.active_flag =1  ${hospital_query}
        ${branch_query} and
    str_to_date(pgi.baby_date_of_admission, '%d/%m/%Y') between '${fromDate}' and '${toDate}'
    group by ${chartType}(str_to_date(pgi.baby_date_of_admission, '%d/%m/%Y'))
     ) as b on a.${chartType}=b.${chartType}
    `, {
    });
    console.log("here in 3");
    res.json({ results2 });
  }



};

module.exports = cardsCount;




