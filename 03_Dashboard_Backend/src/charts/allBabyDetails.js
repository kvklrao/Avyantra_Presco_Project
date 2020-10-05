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

    var userId = user.user_id;
    if (fromDate == null) {
        const [results, metadata] = await sequelize.query(`select 
	a.baby_medical_record_number AS baby_medical_record_number,
	d.reading AS reading,
    a.hospital_name AS hospital_name,
    a.hospital_branch_name AS hospital_branch_name,  
    b.baby_date_of_admission AS baby_date_of_admission
    from avyantra_dev.patient_basic_infos a
    join avyantra_dev.patient_general_infos b on
        a.id = b.study_id
    join avyantra_dev.dashboard_users c on 
        c.hospital_id = a.hospital_id
    join avyantra_dev.patient_baby_appears_infos d on
        a.id = d.study_id
        where c.user_id = '${userId}' 
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
    b.baby_date_of_admission AS baby_date_of_admission
    from avyantra_dev.patient_basic_infos a
    join avyantra_dev.patient_general_infos b on
        a.id = b.study_id
    join avyantra_dev.dashboard_users c on 
        c.hospital_id = a.hospital_id
    join avyantra_dev.patient_baby_appears_infos d on
        a.id = d.study_id
        where c.user_id = '${userId}' and
        str_to_date(b.baby_date_of_admission , '%d/%m/%Y') between '${fromDate}' and '${toDate}'
        order by a.baby_medical_record_number,d.reading`, {
        });
        res.json({ results2 });
    }

};

module.exports = allBabyDetails;




