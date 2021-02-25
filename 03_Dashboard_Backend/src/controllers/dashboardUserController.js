const { sequelize } = require('../sequelize');

const createOrUpdateUser = async (req, res) => {

     var userid = req.body.user_id;
     var username = req.body.username;
     var email = req.body.email;
     var hospital_id = req.body.hospital_id;
     var hospital_branch_id = req.body.hospital_branch_id;
       
     if (req.body.hospital_access != null && req.body.branch_access != null) {

          var hospital_access = req.body.hospital_access;
          var branch_access = req.body.branch_access;
     } else if (req.body.hospital_access != null) {

          var hospital_access = req.body.hospital_access;
          var branch_access = req.body.hospital_access ? 1 : 0;
     } else {

          var branch_access = req.body.branch_access;
          var hospital_access = 0;
     }


     try {
          const [results, metadata] = await sequelize.query(`
          INSERT INTO dashboard_users 
          (user_id, username, email,
          hospital_id,hospital_branch_id,is_primary_user,hospital_access,branch_access,createdAt,updatedAt)

               VALUES (${userid},"${username}","${email}",
               ${hospital_id},${hospital_branch_id},0,${hospital_access},
               ${branch_access},0,0) 

               ON DUPLICATE KEY UPDATE    

               username= "${username}", 
               email="${email}",
               hospital_id =${hospital_id},
               hospital_branch_id =${hospital_branch_id},
               is_primary_user = 0,
               hospital_access=${hospital_access},
               branch_access=${branch_access},
               createdAt=0,
               updatedAt=0
          `, {
          });

          res.status(201).json({ response: "user successfuly created/updated" });
     }
     catch (e) {
          res.status(401).send({ error: 'unable to change' })
     }
};

module.exports = createOrUpdateUser;
