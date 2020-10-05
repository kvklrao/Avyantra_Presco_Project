var jwt_decode = require("jwt-decode")
const DashboardUser = require('../models/dashboardUser')
const { sequelize } = require('../sequelize');

const admin = async (req, res) => {

    const token = req.header('Authorization').replace('Bearer ', '')
    var decoded = jwt_decode(token);
    var mail = decoded.name;
    const user = await DashboardUser.findOne({ where: { email: mail } });
    var hospitalId = user.hospital_id;
    const [results, metadata] = await sequelize.query(`SELECT vw_get_staffs.hospital_id ,
    vw_get_staffs.user_id,dashboard_users.username , false as is_primary_user,
    dashboard_users.branch_access ,dashboard_users.hospital_access,dashboard_users.email,dashboard_users.hospital_branch_id
    FROM vw_get_staffs
    join map_staff_hospitals on 
    (map_staff_hospitals.hospital_id = vw_get_staffs.hospital_id 
    and map_staff_hospitals.hospital_branch_id = vw_get_staffs.hospital_branch_id 
    and map_staff_hospitals.staff_id = vw_get_staffs.staff_id)
    left join dashboard_users on vw_get_staffs.user_id = dashboard_users.user_id 
    left join m_users on m_users.user_id = dashboard_users.user_id 
    WHERE vw_get_staffs.hospital_id=${hospitalId} and m_users.active_flag =1
   
    union  all 
    SELECT m_hospitals.hospital_id ,m_hospitals.user_id,
    dashboard_users.username , true as is_primary_user,dashboard_users.branch_access ,dashboard_users.hospital_access ,
    dashboard_users.email,dashboard_users.hospital_branch_id
    from m_hospitals 
    left join dashboard_users on m_hospitals.user_id = dashboard_users.user_id 
    left join m_users on m_users.user_id = dashboard_users.user_id 
    where m_hospitals.hospital_id =${hospitalId} and m_users.active_flag =1
 `, {
    });

    const [hospitalName] = await sequelize.query(`SELECT m_hospitals.hospital_name
                                                    from m_hospitals
                             where m_hospitals.hospital_id =${hospitalId}
                            `, {
    });

    res.json({results,hospitalName});

};

module.exports = admin;