const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');
const auth = require('./middleware/auth');
const admin = require('./middleware/admin');
const { sequelize } = require('./sequelize');
const createOrUpdateUser = require('./controllers/dashboardUserController');

const chart1 = require('./charts/chart1');
const allBabyDetails = require('./charts/allBabyDetails')
const babyRecord = require('./charts/babyRecord')
const babyDetailsToCsv = require('./charts/babyDetailsToCsv')
const babyRecordAsha = require('./charts/babyRecordAsha')
const genderDistribution = require('./charts/genderDistribution');
const preTermGraph = require('./charts/preTermGraph');
const typeOfDeliveryGraph = require('./charts/typeOfDeliveryGraph');
const eosLosGraph = require('./charts/eosLosGraph');
const finalDiagnosisGraph = require('./charts/finalDiagnosisGraph');

require('dotenv').config();

const PORT = process.env.PORT || 8080;

const app = express();


app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.get('/', async (req, res) => {
  res.json('Hello World!')
});

app.post('/api/user',auth, createOrUpdateUser);



app.get('/api', auth, async (req, res) => {
  res.json({
    token: req.token,
    is_primary_user:req.is_primary_user,
    branch_access: req.branch_access,
    hospital_access: req.hospital_access
  })
});

app.get('/api/admin', auth, admin);

app.get('/api/chart1', auth, chart1);

app.get('/api/allBabyDetails', auth, allBabyDetails);

app.get('/api/babyRecord', auth, babyRecord);

app.get('/api/babyRecordAsha', auth, babyRecordAsha);

app.get('/api/babyDetailsToCsv', auth, babyDetailsToCsv);

app.get('/api/genderDistribution', auth, genderDistribution);

app.get('/api/preTermGraph' , auth ,preTermGraph, async (req, res) => {
  // res.json({: true})
 
   res.json( { results : req.results})
       
});

app.get('/api/typeOfDeliveryGraph' , auth ,typeOfDeliveryGraph, async (req, res) => {
  // res.json({: true})
 
   res.json( { results : req.results})
       
});

app.get('/api/eosLosGraph', auth, eosLosGraph);

app.get('/api/finalDiagnosisGraph', auth,finalDiagnosisGraph);



//force:true
sequelize.sync().then(() => {

  app.listen(PORT, () => {
    console.log(`App listening on PORT ${PORT}`);
  });
});

