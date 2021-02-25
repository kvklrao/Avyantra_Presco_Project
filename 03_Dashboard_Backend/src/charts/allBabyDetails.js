const { sequelize } = require('../sequelize');
var jwt_decode = require("jwt-decode");
const DashboardUser = require('../models/dashboardUser');

const allBabyDetails = async (req, res) => {
    let fromDate = req.query.from_date;
    let toDate = req.query.to_date;
    console.log(fromDate)
    const token = req.header('Authorization').replace('Bearer ', '')
    var decoded = jwt_decode(token);

    var mail = decoded.name;
    const user = await DashboardUser.findOne({ where: { email: mail } });

    var branchId = user.hospital_branch_id;
    let all_hospitals = req.query.all_hospitals;
    let all_branches = req.query.all_branches;
    console.log(req.query.hospital_id, req.query.hospital_id)
    if (all_hospitals == 1 && (req.query.hospital_id == "" || req.query.hospital_id == undefined)) {
        console.log("all_hospitals")
        var hospital_query = "";
        var hospital_query1 = "";
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
        if ( req.query.branch_id == "") {
            console.log("hereeeee", branchId, user.hospital_branch_id)
            var branch_query = "and a.hospital_branch_id=" + branchId;
        } else {
            var branch_query = "and a.hospital_branch_id =" + req.query.branch_id;
        }
    }

    if (fromDate == null) {
        const [results, metadata] = await sequelize.query(`select 
	a.baby_medical_record_number AS baby_medical_record_number,
	d.reading AS reading,
    a.hospital_name AS hospital_name,
    a.hospital_branch_name AS hospital_branch_name,
    a.hospital_id as hospital_id,
    a.hospital_branch_id as hospital_branch_id,  
    b.baby_date_of_admission AS baby_date_of_admission
    from avyantra_dev.patient_basic_infos a
    join avyantra_dev.patient_general_infos b on
        a.id = b.study_id
    join avyantra_dev.patient_baby_appears_infos d on
        a.id = d.study_id
        join m_hospitals mh on a.hospital_id = mh.hospital_id
        where mh.active_flag = 1
        ${hospital_query}
        ${branch_query} 
        order by a.baby_medical_record_number,d.reading`, {
        });
        res.json({ results });
    }

    else if (fromDate != null) {

        const [results2, metadata2] = await sequelize.query(`select 
	a.baby_medical_record_number AS baby_medical_record_number,
	d.reading AS reading,
    a.hospital_name AS hospital_name,
    a.hospital_branch_name AS hospital_branch_name,  
    b.baby_date_of_admission AS baby_date_of_admission,
    a.hospital_id as hospital_id,
    a.hospital_branch_id as hospital_branch_id
    from avyantra_dev.patient_basic_infos a
    join avyantra_dev.patient_general_infos b on
        a.id = b.study_id
    join avyantra_dev.patient_baby_appears_infos d on
        a.id = d.study_id
        join m_hospitals mh on a.hospital_id = mh.hospital_id
        where 
        str_to_date(b.baby_date_of_admission , '%d/%m/%Y') between '${fromDate}' and '${toDate}'
        ${hospital_query}
        ${branch_query}
        and mh.active_flag =1
        order by a.baby_medical_record_number,d.reading`, {
        });
        res.json({ results2 });
    }

};

module.exports = allBabyDetails;




