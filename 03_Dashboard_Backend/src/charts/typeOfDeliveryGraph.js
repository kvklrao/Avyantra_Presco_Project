const { sequelize } = require('../sequelize');
var jwt_decode = require("jwt-decode");
const DashboardUser = require('../models/dashboardUser');

const typeOfDeliveryGraph = async (req, res) => {

    let range = req.query.range;// 0 - dates query,1- weekly,2-monthly,3,quarterly,4 yearly
    let sepsisStatus = req.query.sepsis_status;
    let fromDate = req.query.date_from;
    let toDate = req.query.date_to;

    const token = req.header('Authorization').replace('Bearer ', '')
    var decoded = jwt_decode(token);

    var mail = decoded.name;
    const user = await DashboardUser.findOne({ where: {email: mail} });

    var userId = user.user_id;


    if(range == 0 || range == 1){
      const [results, metadata] = await sequelize.query(`SELECT 
      str_to_date(patient_general_infos.baby_date_of_admission, '%d/%m/%Y') as baby_adm_date,
      patient_baby_investigations.blood_culture_report as sepsis_status,
      patient_maternal_infos.type_of_delivery,
      COUNT(patient_baby_investigations.blood_culture_report)as count
      FROM
      patient_general_infos
      JOIN
      patient_baby_investigations ON patient_baby_investigations.study_id = patient_general_infos.study_id
      join patient_basic_infos on patient_basic_infos.id = patient_general_infos.study_id 
      join patient_maternal_infos on patient_maternal_infos.study_id = patient_basic_infos.id
      join dashboard_users on dashboard_users.hospital_id = patient_basic_infos.hospital_id
      where patient_baby_investigations.blood_culture_report <> 'NA' 
      and  str_to_date(patient_general_infos.baby_date_of_admission, '%d/%m/%Y') between '${fromDate}' and '${toDate}'
      and dashboard_users.user_id = '${userId}'
      and patient_baby_investigations.blood_culture_report = '${sepsisStatus}'
      GROUP BY patient_general_infos.baby_date_of_admission ,patient_baby_investigations.blood_culture_report,patient_maternal_infos.type_of_delivery
      order by baby_adm_date,patient_baby_investigations.blood_culture_report`, {
  });

   res.json({ results });
    }
    else {

      console.log("here in 2");
     if(range == 2){ 
       var chartType = 'week';
       console.log("here in x");
      }
     else if(range ==3) { var chartType = 'month';console.log("here in y");}
     else if(range == 4) { var chartType = 'year';console.log("here in z");}

     const [results2, metadata] = await sequelize.query(`SELECT 
     ${chartType}(str_to_date(patient_general_infos.baby_date_of_admission, '%d/%m/%Y')) as ${chartType},
     str_to_date(patient_general_infos.baby_date_of_admission, '%d/%m/%Y') as baby_adm_date,
     patient_baby_investigations.blood_culture_report as sepsis_status,
     patient_maternal_infos.type_of_delivery,
     COUNT(patient_baby_investigations.blood_culture_report)as count
     FROM
     patient_general_infos
     JOIN
     patient_baby_investigations ON patient_baby_investigations.study_id = patient_general_infos.study_id
     join patient_basic_infos on patient_basic_infos.id = patient_general_infos.study_id 
     join patient_maternal_infos on patient_maternal_infos.study_id = patient_basic_infos.id
     join dashboard_users on dashboard_users.hospital_id = patient_basic_infos.hospital_id
     where patient_baby_investigations.blood_culture_report <> 'NA' 
     and  str_to_date(patient_general_infos.baby_date_of_admission, '%d/%m/%Y') between '${fromDate}' and '${toDate}'
     and dashboard_users.user_id = '${userId}'
     and patient_baby_investigations.blood_culture_report = '${sepsisStatus}'
     GROUP BY ${chartType}(str_to_date(patient_general_infos.baby_date_of_admission, '%d/%m/%Y')) ,
     patient_baby_investigations.blood_culture_report,patient_maternal_infos.type_of_delivery
     order by baby_adm_date,patient_baby_investigations.blood_culture_report`, {
     });
     console.log("here in 3");
      res.json({ results2 });
    }
  
};

module.exports = typeOfDeliveryGraph;




