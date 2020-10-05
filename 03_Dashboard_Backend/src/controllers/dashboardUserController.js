const { sequelize } = require('../sequelize');

const createOrUpdateUser = async (req, res) => {

     var userid = req.body.user_id;
     var username = req.body.username;
     var email = req.body.email;
     var hospital_id = req.body.hospital_id;
     var hospital_branch_id = req.body.hospital_branch_id;
     var is_primary_user = req.body.is_primary_user;
     var hospital_access = req.body.hospital_access;
     var branch_access = req.body.branch_access;


     console.log(userid);
     console.log(username);
          const [results, metadata] = await sequelize.query(`
          INSERT INTO dashboard_users 
          (user_id, username, email,
          hospital_id,hospital_branch_id,is_primary_user,hospital_access,branch_access,createdAt,updatedAt)

               VALUES (${userid},"${username}","${email}",
               ${hospital_id},${hospital_branch_id},${is_primary_user},${hospital_access},
               ${branch_access},0,0) 

               ON DUPLICATE KEY UPDATE    

               username= "${username}", 
               email="${email}",
               hospital_id =${hospital_id},
               hospital_branch_id =${hospital_branch_id},
               is_primary_user =${is_primary_user},
               hospital_access=${hospital_access},
               branch_access=${branch_access},
               createdAt=0,
               updatedAt=0
          `, {
          });

          res.json({response:"user successfuly created/updated"});
     
    
};

module.exports = createOrUpdateUser;
//replace