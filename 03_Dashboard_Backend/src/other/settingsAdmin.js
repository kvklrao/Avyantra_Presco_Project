var jwt_decode = require("jwt-decode")
const DashboardUser = require('../models/dashboardUser')
const { sequelize } = require('../sequelize');

const admin = async (req, res) => {

    const token = req.header('Authorization').replace('Bearer ', '')
    var decoded = jwt_decode(token);
    var mail = decoded.name;
    const user = await DashboardUser.findOne({ where: { email: mail } });
    var hospitalId = user.hospital_id;
    const [results, metadata] = await sequelize.query(`  SELECT 
    distinct vw_get_staffs.user_id,
    m_users.user_name as username ,
    m_users.email_address as email,
    vw_get_staffs.hospital_id ,
    vw_get_staffs.hospital_branch_id,
    false as is_primary_user,
    dashboard_users.branch_access, 
   dashboard_users.hospital_access
   FROM m_users  
    left  join vw_get_staffs on vw_get_staffs.user_id = m_users.user_id 
 left  join dashboard_users on vw_get_staffs.user_id = dashboard_users.user_id 
 left  join m_hospitals_branches on  vw_get_staffs.hospital_id = m_hospitals_branches.hospital_id 
   WHERE vw_get_staffs.hospital_id=${hospitalId}
    and m_users.active_flag =1 
    
       union  all 
   SELECT
   dashboard_users.user_id,
   dashboard_users.username ,
   dashboard_users.email,
    dashboard_users.hospital_id ,
    dashboard_users.hospital_branch_id,
   true as is_primary_user,
   dashboard_users.branch_access ,
   dashboard_users.hospital_access 
   from dashboard_users 
   left join m_hospitals on m_hospitals.user_id = dashboard_users.user_id 
   left join m_users on m_users.user_id = dashboard_users.user_id 
   where m_hospitals.hospital_id =${hospitalId}
    and m_users.active_flag =1
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