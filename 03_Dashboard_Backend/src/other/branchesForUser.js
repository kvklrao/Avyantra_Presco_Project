const { sequelize } = require('../sequelize');
var jwt_decode = require("jwt-decode");
const DashboardUser = require('../models/dashboardUser');

const branchesForUser = async (req, res) => {

    let bmr = req.query.bmr;

    const token = req.header('Authorization').replace('Bearer ', '')
    var decoded = jwt_decode(token);

    var mail = decoded.name;
    const user = await DashboardUser.findOne({ where: { email: mail } });


    if (req.is_super_user && (req.query.hospital_id == "" || req.query.hospital_id == undefined)) {
        var code = " join patient_basic_infos du on du.hospital_id = mhb.hospital_id where mhb.active_flag =1 and m_users.user_type_id != 7 and m_users.user_type_id != 8";
    } else if (req.is_super_user && req.query.hospital_id != "") {
        var code = "  where mhb.hospital_id =" + req.query.hospital_id + " and mhb.active_flag =1 and m_users.user_type_id != 7 and m_users.user_type_id != 8";
    }
    else {
        var code = "join patient_basic_infos du on du.hospital_id = mhb.hospital_id where du.hospital_id =" + user.hospital_id + " and mhb.active_flag =1 and m_users.user_type_id != 7 and m_users.user_type_id != 8";
    }

    const [results, metadata] = await sequelize.query(`select distinct mhb.hospital_id ,
    mhb.hospital_branch_id ,
    mhb.branch_name from m_hospitals_branches mhb join m_users on m_users.user_id = mhb.user_id
    ${code} 
    order by mhb.hospital_branch_id`, {
    });

    res.json({ results });


};

module.exports = branchesForUser;




