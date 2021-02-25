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
            var sepsis_condition = " and c.final_diagnosis_sepsis = 'Yes' and b.baby_condition_suspect = 'Yes'";
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

    if (range == 0 || range == 1) {
        const [results, metadata] = await sequelize.query(`select baby_adm_date,
        sum(case when IsFinalSepsisYes = 1 then 1 else 0 end) as sepsis_final_positive_count,
        sum(case when IsFinalSepsisYes = 0 then 1 else 0 end) as sepsis_final_negative_count,
        sum(case when IsPrelimSepsisYes = 1 then 1 else 0 end) as sepsis_prelim_positive_count,
        sum(case when IsPrelimSepsisYes = 0 then 1 else 0 end) as sepsis_prelim_negative_count
        from
        (select
             str_to_date(b.baby_date_of_admission, '%d/%m/%Y') as baby_adm_date,  
             c.final_diagnosis_sepsis,
             a.hospital_id as hospital_id,
                a.hospital_branch_id as hospital_branch_id,
                case when
                sum(case when c.${parameter} = '${parameter3}' then 1 else 0 end) >0 then 1 else 0 end as IsFinalSepsisYes,
                case when
                sum(case when b.${parameter2} = '${parameter5}' then 1 else 0 end) >0 then 1 else 0 end as IsPrelimSepsisYes
                        from
                           avyantra_dev.patient_basic_infos a
                       join avyantra_dev.patient_general_infos b on
                          a.id = b.study_id
                        join avyantra_dev.patient_baby_appears_infos d on
                          a.id = d.study_id
                          join m_hospitals mh on a.hospital_id = mh.hospital_id   
                     join avyantra_dev.patient_baby_finals c on
                            a.id = c.study_id
                                   and d.reading = c.reading
                                 where
                                 c.final_diagnosis_sepsis <> 'NA' and 
                                  b.baby_condition_suspect <> 'NA' and
                           str_to_date(b.baby_date_of_admission, '%d/%m/%Y') between '${fromDate}' and '${toDate}'
                           and mh.active_flag=1
                           GROUP BY str_to_date(b.baby_date_of_admission, '%d/%m/%Y'),
                           a.hospital_id,
                           a.hospital_branch_id ) as a
                           group by a.baby_adm_date       
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

        const [results2, metadata] = await sequelize.query(`select ${chartType},
        sum(case when IsFinalSepsisYes = 1 then 1 else 0 end) as sepsis_final_positive_count,
        sum(case when IsFinalSepsisYes = 0 then 1 else 0 end) as sepsis_final_negative_count,
        sum(case when IsPrelimSepsisYes = 1 then 1 else 0 end) as sepsis_prelim_positive_count,
        sum(case when IsPrelimSepsisYes = 0 then 1 else 0 end) as sepsis_prelim_negative_count
        from
        (select
              ${chartType}(str_to_date(b.baby_date_of_admission, '%d/%m/%Y')) as ${chartType}, 
             str_to_date(b.baby_date_of_admission, '%d/%m/%Y') as baby_adm_date,  
             c.final_diagnosis_sepsis,
             a.hospital_id as hospital_id,
                a.hospital_branch_id as hospital_branch_id,
                case when
                sum(case when c.${parameter} = '${parameter3}' then 1 else 0 end) >0 then 1 else 0 end as IsFinalSepsisYes,
                case when
                sum(case when b.${parameter2} = '${parameter5}' then 1 else 0 end) >0 then 1 else 0 end as IsPrelimSepsisYes
                        from
                           avyantra_dev.patient_basic_infos a
                       join avyantra_dev.patient_general_infos b on
                          a.id = b.study_id
                        join avyantra_dev.patient_baby_appears_infos d on
                          a.id = d.study_id
                          join m_hospitals mh on a.hospital_id = mh.hospital_id   
                     join avyantra_dev.patient_baby_finals c on
                            a.id = c.study_id
                                   and d.reading = c.reading
                                 where
                                 c.final_diagnosis_sepsis <> 'NA' and 
                                  b.baby_condition_suspect <> 'NA' and
                           str_to_date(b.baby_date_of_admission, '%d/%m/%Y') between '${fromDate}' and '${toDate}'
                           and mh.active_flag=1
                           GROUP BY ${chartType}(str_to_date(b.baby_date_of_admission, '%d/%m/%Y')),
                           a.hospital_id,
                           a.hospital_branch_id ) as a
                           group by a.${chartType} 
       `, {
        });
        console.log("here in 3");
        res.json({ results2 });
    }

};

module.exports = finalDiagnosisGraph;


