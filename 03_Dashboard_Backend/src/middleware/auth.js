var jwt_decode = require("jwt-decode")
const DashboardUser = require('../models/dashboardUser')

const auth = async (req, res, next) => {
    try {

        // decode the token and give email to a variable
        const token = req.header('Authorization').replace('Bearer ', '')
        var decoded = jwt_decode(token);

        var mail = decoded.name;

        // query the db and check if mail exists or not
        const user = await DashboardUser.findOne({ where: {email: mail} });
      

        // if not user throw error
        if (!user) {
            throw new Error()
        }

        // append the access type branch/hospital to the request
        req.token = token
        req.is_primary_user = user.is_primary_user
        req.hospital_access = user.hospital_access
        req.branch_access = user.branch_access

        //calling next on success
        next()
    } catch (e) {
        res.status(401).send({ error: 'Please authenticate.' })
    }
};

module.exports = auth;