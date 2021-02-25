const { sequelize } = require('../sequelize');
var jwt_decode = require("jwt-decode");
const DashboardUser = require('../models/dashboardUser');

const crpVsBloodCulturePredictiveScore = async (req, res) => {
  let fromDate = req.query.from_date;
  let toDate = req.query.to_date;
  let sepsis_status = req.query.sepsis_status;
  let bmr = req.query.bmr;
  console.log(bmr)
  const token = req.header('Authorization').replace('Bearer ', '')
  var decoded = jwt_decode(token);

  var mail = decoded.name;
  const user = await DashboardUser.findOne({ where: { email: mail } });

  if (bmr == 'undefined' || bmr == "") {
    var find_bmr = " "
  } else {
    var find_bmr = " a.baby_medical_record_number=" + bmr;
  }

  let all_hospitals = req.query.all_hospitals;
  let all_branches = req.query.all_branches;
  console.log(req.query.hospital_id, req.query.hospital_id)
  if (all_hospitals == 1 && (req.query.hospital_id == "" || req.query.hospital_id == undefined)) {
    console.log("all_hospitals")
    var hospital_query = "";
  } else {
    if (req.query.hospital_id == "") {
      var hospital_query = "and a.hospital_id= " + user.hospital_id;
    } else {
      var hospital_query = "and a.hospital_id = " + req.query.hospital_id;
    }

  }

  if (all_branches == 1 && (req.query.branch_id == "" || req.query.branch_id == undefined)) {
    console.log("all_branches")
    var branch_query = "";
  } else {
    if (req.query.branch_id == "") {
      var branch_query = "and a.hospital_branch_id=" + user.hospital_branch_id;
    } else {
      var branch_query = "and a.hospital_branch_id =" + req.query.branch_id;
    }

  }


  if (fromDate == null) {
    const [results, metadata] = await sequelize.query(`select  
        a.baby_medical_record_number as bmr,a.id,
        str_to_date(e.baby_date_of_admission, '%d/%m/%Y') as baby_adm_date,
        a.hospital_name ,
        a.hospital_branch_name ,
        a.hospital_id as hospital_id,
        a.hospital_branch_id as hospital_branch_id,
        d.baby_c_reactive_protien_levels as crp_value,
        d.baby_c_reactive_protien_result as crp_status,
        e.baby_condition_suspect as sepsis_status,
        f.sepsis_score as asha_sepsis_score,
        max( if( ssfp.reading = 'R1', (ssfp.sepsis_score *10), 0 ) ) AS R1,  
        max( if( ssfp.reading = 'R2', (ssfp.sepsis_score *10), 0 ) ) AS R2,
        max( if( ssfp.reading = 'R3', (ssfp.sepsis_score *10), 0 ) ) AS R3,  
        max( if( ssfp.reading = 'R4', (ssfp.sepsis_score *10), 0 ) ) AS R4,  
        max( if( ssfp.reading = 'R5', (ssfp.sepsis_score *10), 0 ) ) AS R5,  
        max( if( ssfp.reading = 'R6', (ssfp.sepsis_score *10), 0 ) ) AS R6,  
        max( if( ssfp.reading = 'R7', (ssfp.sepsis_score *10), 0 ) ) AS R7,  
        max( if( ssfp.reading = 'R8', (ssfp.sepsis_score *10), 0 ) ) AS R8,  
        max( if( ssfp.reading = 'R9', (ssfp.sepsis_score *10), 0 ) ) AS R9,  
        max( if( ssfp.reading = 'R10', (ssfp.sepsis_score *10), 0 ) ) AS R10 
    FROM 
        patient_basic_infos a 
        left join sepsis_score_full_params ssfp
        on ssfp.id = a.id
        join m_hospitals_branches c on 
            a.hospital_id = c.hospital_id 
        left join  patient_baby_investigations d on 
            a.id = d.study_id 
        left join patient_general_infos e on 
            e.study_id = a.id 
        left join sepsis_score_asha f on 
            f.id = a.id
            join m_hospitals mh on a.hospital_id = mh.hospital_id
            where mh.active_flag=1
      ${find_bmr}  ${hospital_query}
    ${branch_query} 
    group by a.baby_medical_record_number,
    str_to_date(e.baby_date_of_admission, '%d/%m/%Y'),
    d.baby_c_reactive_protien_levels,
    d.baby_c_reactive_protien_result,
    f.sepsis_score
    order by str_to_date(e.baby_date_of_admission, '%d/%m/%Y') desc`, {
    });
    res.json({ results });
  }

  else if (fromDate != null) {

    const [results2, metadata2] = await sequelize.query(`select  
        a.baby_medical_record_number as bmr,a.id,
        str_to_date(e.baby_date_of_admission, '%d/%m/%Y') as baby_adm_date,
        a.hospital_name ,
        a.hospital_branch_name ,
        a.hospital_id as hospital_id,
        a.hospital_branch_id as hospital_branch_id,
        d.baby_c_reactive_protien_levels as crp_value,
        d.baby_c_reactive_protien_result as crp_status,
        e.baby_condition_suspect as sepsis_status,
        f.sepsis_score as asha_sepsis_score,
        max( if( ssfp.reading = 'R1', (ssfp.sepsis_score *10), 0 ) ) AS R1,  
        max( if( ssfp.reading = 'R2', (ssfp.sepsis_score *10), 0 ) ) AS R2,
        max( if( ssfp.reading = 'R3', (ssfp.sepsis_score *10), 0 ) ) AS R3,  
        max( if( ssfp.reading = 'R4', (ssfp.sepsis_score *10), 0 ) ) AS R4,  
        max( if( ssfp.reading = 'R5', (ssfp.sepsis_score *10), 0 ) ) AS R5,  
        max( if( ssfp.reading = 'R6', (ssfp.sepsis_score *10), 0 ) ) AS R6,  
        max( if( ssfp.reading = 'R7', (ssfp.sepsis_score *10), 0 ) ) AS R7,  
        max( if( ssfp.reading = 'R8', (ssfp.sepsis_score *10), 0 ) ) AS R8,  
        max( if( ssfp.reading = 'R9', (ssfp.sepsis_score *10), 0 ) ) AS R9,  
        max( if( ssfp.reading = 'R10', (ssfp.sepsis_score *10), 0 ) ) AS R10 
    FROM 
        patient_basic_infos a 
        left join sepsis_score_full_params ssfp
        on ssfp.id = a.id
        join m_hospitals_branches c on 
            a.hospital_id = c.hospital_id 
        left join  patient_baby_investigations d on 
            a.id = d.study_id 
        left join patient_general_infos e on 
            e.study_id = a.id 
        left join sepsis_score_asha f on 
            f.id = a.id
            join m_hospitals mh on a.hospital_id = mh.hospital_id
            where mh.active_flag=1
      ${find_bmr} ${hospital_query}
    ${branch_query}
    and e.baby_condition_suspect ='${sepsis_status}'
    and str_to_date(e.baby_date_of_admission, '%d/%m/%Y') between '${fromDate}' and '${toDate}'
    
    group by a.baby_medical_record_number,
    d.baby_c_reactive_protien_levels,
    d.baby_c_reactive_protien_result,
    f.sepsis_score
    order by str_to_date(e.baby_date_of_admission, '%d/%m/%Y') desc`, {
    });
    res.json({ results2 });
  }

};

module.exports = crpVsBloodCulturePredictiveScore;




