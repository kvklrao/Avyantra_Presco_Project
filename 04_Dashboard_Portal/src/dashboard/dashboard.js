import React from 'react';
// import './App.css';
import { Navbar, Row, Col, DropdownButton, Dropdown } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import avyantra from '../images/avyantra.jpg'
import GenderDistribution from './genderDistributionGraph';
import PreTermBabies from './preTermBabies';
import SepsisVsNonSepsis from './sepsisVsNonSepsis';
import TotalCasesAndReading from './totalCasesAndReading';
import TypeOfDelivery from './typeOfDelivery';
import MotherParametersAvailable from './motherParametersAvailable';

const navbarStyles = {

};
const colStyle = {
  backgroundColor: 'white',
  width:300
};
const divColStyle = {
  flex: 1,
  marginLeft: 15,
  marginTop:'5%'
};
const rowStyle = {
  marginLeft: 30,
  marginRight: 10,
}
const clear = {
  marginTop: "20"
}
const mainDiv = {
  backgroundColor: '#DCDCDC',
  flex:1,
  height: "100vh",
}

const dropDownStyle = {
  marginLeft: '170vh'
}

function Dashboard() {
  return (
    <div style={mainDiv}>

      <div >

        <Row style={rowStyle}>

          <div style={divColStyle}>
            <h5>Gender Distribution check</h5>
            <Col style={colStyle}>
              < GenderDistribution />
            </Col>
          </div>


          <div style={divColStyle}>
            <h5>Mother Parameters Available</h5>
            <Col style={colStyle}>
            < MotherParametersAvailable />
            </Col>
          </div>


          <div style={divColStyle}>
            <h5>Total Cases and Readings</h5>
            <Col style={colStyle}>
            < TotalCasesAndReading />
            </Col>
          </div>


        </Row>


        <div style={clear}></div>

        <Row style={rowStyle}>
          
          <div style={divColStyle}>
            <h5>Type of delivery</h5>
            <Col style={colStyle}>
              < TypeOfDelivery />
            </Col>
          </div>


          <div style={divColStyle}>
            <h5>Sepsis vs Non Sepsis breakdown</h5>
            <Col style={colStyle}>
              < SepsisVsNonSepsis />
            </Col>
          </div>


          <div style={divColStyle}>
            <h5>Pre-Term babies</h5>
            <Col style={colStyle}>
              < PreTermBabies />
            </Col>
          </div>

        </Row>

      </div>
      
    </div>
  );
}

export default Dashboard;
