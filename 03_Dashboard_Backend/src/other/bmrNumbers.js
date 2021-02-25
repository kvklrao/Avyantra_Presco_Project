const { sequelize } = require('../sequelize');
var jwt_decode = require("jwt-decode");
const DashboardUser = require('../models/dashboardUser');

const allBmrNumbers = async (req, res) => {


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


    const [results, metadata] = await sequelize.query(`select 
    a.baby_medical_record_number ,
    count(ssfp.reading) as number_of_readings
    FROM 
    patient_basic_infos a join sepsis_score_full_params ssfp
    on ssfp.id = a.id
    join m_hospitals mh on a.hospital_id = mh.hospital_id
    where mh.active_flag=1 
    ${hospital_query}
    ${branch_query} 
    group by a.baby_medical_record_number
    order by a.baby_medical_record_number `, {
    });

    res.json({ results });


};

module.exports = allBmrNumbers;




