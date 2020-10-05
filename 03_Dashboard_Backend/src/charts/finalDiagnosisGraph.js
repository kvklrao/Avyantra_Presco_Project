const { sequelize } = require('../sequelize');
var jwt_decode = require("jwt-decode");
const DashboardUser = require('../models/dashboardUser');

const finalDiagnosisGraph = async (req, res) => {

    let parameter = req.query.parameter;
    let range = req.query.range;// 0 - dates query,1- weekly,2-monthly,3,quarterly,4 yearly
    let fromDate = req.query.date_from;
    let toDate = req.query.date_to;

    const token = req.header('Authorization').replace('Bearer ', '')
    var decoded = jwt_decode(token);

    var mail = decoded.name;
    const user = await DashboardUser.findOne({ where: { email: mail } });


    switch (parameter) {

        //1
        case 'final_diagnosis_rds':
            var parameter2 = 'baby_condition_rds_yes_no';
            var parameter3 = 'Yes';
            var parameter4 = 'No';
            var parameter5 = 'Yes';
            var parameter6 = 'No';
            var sepsis_condition = "";
            break;

        //2
        case 'final_diagnosis_ttnb':
            var parameter2 = 'baby_condition_ttnb_suspect';
            var parameter3 = 'Yes';
            var parameter4 = 'No';
            var parameter5 = 'Yes';
            var parameter6 = 'No';
            var sepsis_condition = "";
            break;


        //3
        case 'final_diagnosis_jaundice':
            var parameter2 = 'baby_condition_jaundice_suspect';
            var parameter3 = 'Yes';
            var parameter4 = 'No';
            var parameter5 = 'Yes';
            var parameter6 = 'No';
            var sepsis_condition = "";
            break;

        //4
        case 'final_diagnosis_lbw':
            var parameter2 = 'baby_condition_lbw_suspect';
            var parameter3 = 'Yes';
            var parameter4 = 'No';
            var parameter5 = 'Yes';
            var parameter6 = 'No';
            var sepsis_condition = "";
            break;

        //5
        case 'final_diagnosis_lga':
            var parameter2 = 'baby_condition_lga_suspect';
            var parameter3 = 'Yes';
            var parameter4 = 'No';
            var parameter5 = 'Yes';
            var parameter6 = 'No';
            var sepsis_condition = "";
            break;

        //6
        case 'final_diagnosis_aga':
            var parameter2 = 'baby_condition_aga_suspect ';
            var parameter3 = 'Yes';
            var parameter4 = 'No';
            var parameter5 = 'Yes';
            var parameter6 = 'No';
            var sepsis_condition = "";
            break;

        //7
        case 'final_diagnosis_sga':
            var parameter2 = 'baby_condition_sga_suspect ';
            var parameter3 = 'Yes';
            var parameter4 = 'No';
            var parameter5 = 'Yes';
            var parameter6 = 'No';
            var sepsis_condition = "";
            break;

        //8
        case 'final_diagnosis_anemia':
            var parameter2 = 'baby_condition_anemia_suspect ';
            var parameter3 = 'Yes';
            var parameter4 = 'No';
            var parameter5 = 'Yes';
            var parameter6 = 'No';
            var sepsis_condition = "";
            break;

        //9
        case 'final_diagnosis_dextochordia ':
            var parameter2 = 'baby_condition_dextrocordia_suspect ';
            var parameter3 = 'Yes';
            var parameter4 = 'No';
            var parameter5 = 'Yes';
            var parameter6 = 'No';
            var sepsis_condition = "";
            break;

        //10
        case 'final_diagnosis_hypoglycemia':
            var parameter2 = 'prelim_diagnosis_hypoglycemia';
            var parameter3 = 'Yes';
            var parameter4 = 'No';
            var parameter5 = 'Yes';
            var parameter6 = 'No';
            var sepsis_condition = "";
            break;

        //11
        case 'final_diagnosis_hypocalcemia':
            var parameter2 = 'prelim_diagnosis_hypocalcemia';
            var parameter3 = 'Yes';
            var parameter4 = 'No';
            var parameter5 = 'Yes';
            var parameter6 = 'No';
            var sepsis_condition = "";
            break;

        //12
        case 'final_diagnosis_gastroenteritis':
            var parameter2 = 'prelim_diagnosis_gastroenteritis';
            var parameter3 = 'Yes';
            var parameter4 = 'No';
            var parameter5 = 'Yes';
            var parameter6 = 'No';
            var sepsis_condition = "";
            break;

        //13
        case 'final_diagnosis_perinatal_respiratory_depression':
            var parameter2 = 'prelim_diagnosis_perinatal';
            var parameter3 = 'Yes';
            var parameter4 = 'No';
            var parameter5 = 'Yes';
            var parameter6 = 'No';
            var sepsis_condition = "";
            break;

        //14
        case 'final_diagnosis_shock':
            var parameter2 = 'baby_shock_aga_suspect';
            var parameter3 = 'Yes';
            var parameter4 = 'No';
            var parameter5 = 'Yes';
            var parameter6 = 'No';
            var sepsis_condition = "";
            break;

        //15
        case 'final_diagnosis_feeding_intolerence':
            var parameter2 = 'prelim_diagnosis_feeding_intolerence';
            var parameter3 = 'Yes';
            var parameter4 = 'No';
            var parameter5 = 'Yes';
            var parameter6 = 'No';
            var sepsis_condition = "";
            break;

        //16
        case 'final_diagnosis_eos_los':
            var parameter2 = 'baby_condition_yes_eos_los';
            var parameter3 = 'EOS';
            var parameter4 = 'LOS';
            var parameter5 = 'Eos';
            var parameter6 = 'Los';
            var sepsis_condition = " and c.final_diagnosis_sepsis = 'Yes' and b.baby_condition_suspect = 'Yes'" ;
            break;

        //17
        case 'final_diagnosis_sepsis':
            var parameter2 = 'baby_condition_suspect';
            var parameter3 = 'Yes';
            var parameter4 = 'No';
            var parameter5 = 'Yes';
            var parameter6 = 'No';
            var sepsis_condition = "";
            break;

    }

    var userId = user.user_id;
    if (range == 0 || range == 1) {
        const [results, metadata] = await sequelize.query(`select 
        str_to_date(b.baby_date_of_admission, '%d/%m/%Y') as baby_adm_date,
        c.${parameter},
        count(case when c.${parameter} = '${parameter3}' then 1
        else null end) AS final_diagnosis_positive_count,
        count(case when c.${parameter} = '${parameter4}' then 1
        else null end) AS final_diagnosis_negative_count ,
        count(case when b.${parameter2} = '${parameter5}' then 1 
        else null end) AS preliminary_diagnosis_positive_count, 
        count(case when b.${parameter2} = '${parameter6}' then 1 
        else null end) AS preliminary_diagnosis_negative_count
     
        from
        avyantra_dev.patient_basic_infos a
               join avyantra_dev.patient_general_infos b on
                  a.id = b.study_id
               join avyantra_dev.patient_baby_appears_infos d on
              a.id = d.study_id   
              join avyantra_dev.patient_baby_finals c on
                  a.id = c.study_id
                     and d.reading = c.reading
              join avyantra_dev.dashboard_users l on
                        l.hospital_id = a.hospital_id
                        where l.user_id = '${userId}'
                and  str_to_date(b.baby_date_of_admission, '%d/%m/%Y') between '${fromDate}' and '${toDate}'
                ${sepsis_condition}
               GROUP BY str_to_date(b.baby_date_of_admission, '%d/%m/%Y')       
    `, {
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

        const [results2, metadata] = await sequelize.query(`select 
       ${chartType}(str_to_date(b.baby_date_of_admission, '%d/%m/%Y')) as ${chartType},
     str_to_date(b.baby_date_of_admission, '%d/%m/%Y') as baby_adm_date,
     c.${parameter},
     count(case when c.${parameter} = '${parameter3}' then 1
        else null end) AS final_diagnosis_positive_count,
        count(case when c.${parameter} = '${parameter4}' then 1
        else null end) AS final_diagnosis_negative_count ,
        count(case when b.${parameter2} = '${parameter5}' then 1 
        else null end) AS preliminary_diagnosis_positive_count, 
        count(case when b.${parameter2} = '${parameter6}' then 1 
        else null end) AS preliminary_diagnosis_negative_count
      
                from
                   avyantra_dev.patient_basic_infos a
               join avyantra_dev.patient_general_infos b on
                  a.id = b.study_id
                join avyantra_dev.patient_baby_appears_infos d on
                  a.id = d.study_id   
             join avyantra_dev.patient_baby_finals c on
                    a.id = c.study_id
                           and d.reading = c.reading
                     join avyantra_dev.dashboard_users l on
                             l.hospital_id = a.hospital_id
                         where l.user_id = '${userId}'
                   and  str_to_date(b.baby_date_of_admission, '%d/%m/%Y') between '${fromDate}' and '${toDate}'
                   ${sepsis_condition}
                   GROUP BY ${chartType}(str_to_date(b.baby_date_of_admission, '%d/%m/%Y')) 
       `, {
        });
        console.log("here in 3");
        res.json({ results2 });
    }

};

module.exports = finalDiagnosisGraph;


