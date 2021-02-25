var jwt_decode = require("jwt-decode");
const { sequelize } = require('../sequelize');
const DashboardUser = require('../models/dashboardUser')

const auth = async (req, res, next) => {
    try {

        // decode the token and give email to a variable
        const token = req.header('Authorization').replace('Bearer ', '')
        var decoded = jwt_decode(token);

        var mail = decoded.name;

        // query the db and check if mail exists or not
        const user = await DashboardUser.findOne({ where: { email: mail } });

        // if not user throw error
        if (!user) {
            const [results, metadata] = await sequelize.query(`select  m_users.user_id ,m_users.user_name,m_users.email_address,
        m_hospitals.hospital_id,
        m_hospitals_branches.hospital_branch_id as branch_id
        from m_hospitals
        join m_users on m_users.user_id = m_hospitals.user_id 
         left join m_hospitals_branches on  m_hospitals.hospital_id = m_hospitals_branches.hospital_id 
         where m_hospitals.active_flag =1
         and m_users.email_address = '${mail}'
        order by branch_id `, {
            });

            if (results.length > 0) {

                var userid = results[0].user_id;
                var username = results[0].user_name;
                var emailadd = results[0].email_address;
                var hospital_id = results[0].hospital_id;
                var hospital_branch_id = results[0].branch_id;

                const [results2, metadata] = await sequelize.query(`
          INSERT INTO dashboard_users 
          (user_id, username, email,
          hospital_id,hospital_branch_id,
          is_super_user,is_primary_user,hospital_access,branch_access,createdAt,updatedAt)
          VALUES (${userid},"${username}","${emailadd}",
               ${hospital_id},${hospital_branch_id},0,1,1,1,0,0)`, {
                });

                req.token = token
                req.is_super_user = false
                req.is_primary_user = true
                req.hospital_access = true
                req.branch_access = true
                next()

               // res.json({ response: "new primary user successfuly created" });
            } else {
                throw new Error()
            }
        }
        else{

        // append the access type branch/hospital to the request
        req.token = token
        req.is_super_user = user.is_super_user
        req.is_primary_user = user.is_primary_user
        req.hospital_access = user.hospital_access
        req.branch_access = user.branch_access
        next()
        }

        //calling next on success
       // next()
    } catch (e) {
        res.status(401).send({ error: 'Please authenticate.' })
    }
};

module.exports = auth;