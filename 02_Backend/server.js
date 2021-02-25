var express =require('express');
var Cors = require('cors');
var bodyParser = require('body-parser');
var logger = require('morgan');

require('custom-env').env()

const app = express();
const multer  = require('multer');

import { fileUploder, fetchDownloadURL } from './file_utils/fileUploader'

const proutes = require('./routes/patientRoutes')
const hroutes = require('./routes/hospitalRoutes')
const hbroutes = require('./routes/hospitalBranchRoutes')
const hsroutes = require('./routes/hospitalStaffRoutes')

const hospitalStaffController = require('./controllers/hospitalStaffController')
const hospitalController = require('./controllers/hospitalController')
const dropdownList = require('./helper/dropDownList')

const API_PORT = process.env.API_PORT || 8080;

app.use(Cors());
app.use(bodyParser.urlencoded({extended: true }));
app.use(bodyParser.json());
app.use(logger('dev'));

const {sequelize} = require('./sequelize')

/**
 *
 * Auto-generated URL for the load-balancer. DONOT remove
 *
 */

var upload = multer()

app.post("/upload_file", upload.single('file'), async (req, res) => {

  try{
    const isFileUploaded = fileUploder(req);
    if(!isFileUploaded){
      return res.status(500).json({Error: 'Upload error'});
    }
  }
  catch(e){
    return res.status(500).json({Error: 'Upload error'});
  }

  return res.json({OK: 'OK'});
});

app.post("/fetch_download_url", async (req, res) => {

  try{
    const signedURL = await fetchDownloadURL(req.body.file_type, req.body.path);
    return res.status(200).json({url: signedURL});
  }
  catch(e){
    console.log(e);
    return res.status(500).json({Error: 'Error fetching URL'});
  }
});

app.get("/CRIdRlDrEslki", async (req, res) => {
  return res.json({OK: 'OK'});
});

/**
 * 
 *  update hosp profile, update staff routes
 * 
 */
 
app.get('/api/bacteriaList', dropdownList);

app.put('/hospital/updateHospitalProfile/:hospitalId', (req, res, next) => {
  hospitalController.updateHospitalProfile(req, res, next);
});

app.post('/hospitalStaff/addStaff/:hospitalId/:hospitalBranchId', (req, res, next) => {
  hospitalStaffController.addStaff(req, res, next);
});

app.put('/hospitalStaff/updateStaffProfile/:staffId', (req, res, next) => {
  hospitalStaffController.updateStaffProfile(req, res, next);
});

app.put('/hospitalStaff/updateStaff/:hospitalId/:hospitalBranchId/:staffId', (req, res, next) => {
  hospitalStaffController.updateStaff(req, res, next);
});

/**
 * 
 * Signup
 * 
 */

app.post('/hospitalStaff/registerReferralDoctor', (req, res, next) => {
  hospitalStaffController.registerReferralDoctor(req, res, next);
});

app.post('/hospital/signUp', (req, res, next) => {
  hospitalController.hospitalSignUp(req, res, next);
});

app.post('/referralDoctor/sendMail/:emailid', (req,res,next) => {
  hospitalController.referralDoctorSendMail(req,res,next);
});

app.post('/hospital/signUp/aasha', (req, res, next) => {
  hospitalController.aashaHospitalSignUp(req, res, next);
});

/**
 * 
 *  Login route
 * 
 */

require('./routes/loginUser')(app);

/**
 *
 * Check JWT Token
 *
 

app.use(checkJwt, (err, req, res, next) => {
  if (err.name === "UnauthorizedError") {
    
    return res.status(401).json({
      error: true,
      errorMessage: "Invalid token",
      errorDetails: err,
    });
  }
  next();
});

*/

/**
 * 
 * FIXME:: Do this later.
 * ------
 * Secure routes, Routes below will need JWT
 * 
 */

app.use('/patient',proutes)
app.use('/hospital',hroutes)
app.use('/hospitalBranch',hbroutes)
app.use('/hospitalStaff',hsroutes)

require('./routes/patient')(app);
require('./routes/get_tabs')(app);
// require('./routes/findUsers1')(app);
// require('./routes/deleteUser')(app);
// require('./routes/updateUser1')(app);

app.listen(API_PORT, "0.0.0.0", function () {
  console.log("Started the server on the port configured: " + API_PORT + "\n");
});

module.exports = app
exports.port = API_PORT;
    
