import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Modal, Form, Tabs, Row, Col, DatePicker, Button, Card, Select, Radio, Collapse } from "antd";


function BabyDetailsAsha(props) {
    // const [state, setstate] = useState([]);
    const [loading, setloading] = useState(true);
    const [babyData, setBabyData] = useState([]);
    const [visible, setVisible] = useState(false);
    const [babyRecordId, setBabyRecordId] = useState();
    // const [reading, setReading] = useState();
    // const [radioValue, setRadioValue] = useState(2);
    // const [startDate, setStartDate] = useState();
    // const [endDate, setEndDate] = useState();
    useEffect(() => {
        getBabyData(props.baby_record, props.reading);
    }, []);


    const { TabPane } = Tabs;
    const style = { padding: '2px 0' }

    const getBabyData = async (baby_record, reading) => {

        await axios.get(
            process.env.REACT_APP_URL+'/babyRecordAsha?baby_record=' + baby_record + '&reading=' + reading,
            { headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') } }
        ).then(
            res => {
                setloading(false);
                setBabyData(
                    res.data.results
                );
                setVisible(true);
                // console.log(res)
            }
        );
    };

    return (
        <div>
            <Tabs defaultActiveKey="1" >
                <TabPane tab="Baby Profile" key="1">
                    {babyData.map((item, index) => {
                        return <div key={index}>
                            <Row gutter={16}>
                                <Col className="gutter-row" span={12}>
                                    <div style={style}>Baby Medical Record Number : {item.baby_medical_record_number}</div><hr />
                                    <div style={style}>Baby Name : {item.baby_name}</div><hr />
                                    <div style={style}>Baby Gender : </div><hr />
                                    <div style={style}>Admission Type : {item.baby_admission_type}</div><hr />
                                    <div style={style}>Place of Birth(Name) : {item.baby_place_of_birth_name}</div><hr />
                                    <div style={style}>Time of Birth (0-23 Hours) : {item.baby_birth_time_hours}</div><hr />
                                    <div style={style}>Gestational Age : {item.baby_gestational_age}</div><hr />
                                    <div style={style}>Weight at Birth : {item.baby_weight_at_birth}</div><hr />
                                </Col>
                                <Col className="gutter-row" span={12} >
                                    <div style={style}>Mother Medical Record Number : {item.baby_mother_medical_record_number}</div><hr />
                                    <div style={style}>Mother Name : {item.mother_name}</div><hr />
                                    <div style={style}>Date of Admission : {item.baby_date_of_admission}</div><hr />
                                    <div style={style}>Birth Facility : {item.birth_facility}</div><hr />
                                    <div style={style}>Date of Birth : {item.baby_birth_date}</div><hr />
                                    <div style={style}>Age at Admission : {item.baby_age_of_admission}</div><hr />
                                    <div style={style}>Preterm : {item.baby_preterm}</div><hr />
                                    <div style={style}>Weight at Admission : {item.baby_weight_at_admission}</div><hr />
                                </Col>
                            </Row>
                        </div>;
                    })}
                </TabPane>
                <TabPane tab="Mother  Profile" key="2">
                    {babyData.map((item, index) => {
                        return <div key={index}>
                            <Row gutter={16}>
                                <Col className="gutter-row" span={12}>
                                    <div style={style}>Record Id : </div><hr />
                                    <div style={style}>Weight : {item.mother_weight}</div><hr />
                                    <div style={style}>BMI : {item.mother_bmi}</div><hr />
                                    <div style={style}>Blood Pressure(Systolic) : {item.maternal_blood_pressure}</div><hr />
                                    <div style={style}>Rupture Of Membranes (ROM) : {item.rupture_of_membranes_rom}</div><hr />
                                    <div style={style}>Rupture Of Membranes(IF PROM) : </div><hr />
                                    <div style={style}>Delayed Cord Clamping : {item.delayed_cord_clamping}</div><hr />
                                </Col>
                                <Col className="gutter-row" span={12} >
                                    <div style={style}>Age : {item.mother_age}</div><hr />
                                    <div style={style}>Height : {item.mother_height}</div><hr />
                                    <div style={style}>Diabetes (Present) : {item.maternal_diabetes}</div><hr />
                                    <div style={style}>Blood Pressure (Diastolic) : {item.maternal_blood_pressure_diastolic}</div><hr />
                                    <div style={style}>Rupture Of Membranes (Type) : {item.rupture_of_membranes_rom_two}</div><hr />
                                    <div style={style}>Type Of Delivery : {item.type_of_delivery}</div><hr />
                                </Col>
                            </Row>
                        </div>;
                    })}
                </TabPane>
                <TabPane tab="Baby Health Parameters" key="3">
                    {babyData.map((item, index) => {
                        return <div key={index}>
                            <Row gutter={16}>
                                <Col className="gutter-row" span={12}>
                                    <div style={style}>Record Id : </div><hr />
                                    <div style={style}>Breast Feeding Initiation : {item.breast_feeding_initiation}</div><hr />
                                    <div style={style}>BP (Systolic) : </div><hr />
                                    <div style={style}>BP (Mean Arterial) : {item.baby_blood_pressure_mean_arterial_bp}</div><hr />
                                    <div style={style}>Frequency of Stools : {item.frequency_of_stools}</div><hr />
                                    <div style={style}>Abdominal Distension : {item.abdominal_dystension}</div><hr />
                                    <div style={style}>Retraction : {item.retraction}</div><hr />
                                    <div style={style}>Chest In-drawing : {item.baby_chest_indrawing}</div><hr />
                                </Col>
                                <Col className="gutter-row" span={12} >
                                    <div style={style}>Appearance : {item.baby_appearance}</div><hr />
                                    <div style={style}>Feeding Status : {item.baby_feeding_status}</div><hr />
                                    <div style={style}>BP (Diastolic) : </div><hr />
                                    <div style={style}>Urine Output : {item.urine_output}</div><hr />
                                    <div style={style}>Vomiting : {item.vomiting}</div><hr />
                                    <div style={style}>Baby Movement with Stimulation : {item.baby_movement}</div><hr />
                                    <div style={style}>Fast Breathing : {item.fast_breathing}</div><hr />
                                </Col>
                            </Row>
                        </div>;
                    })}
                </TabPane>
            </Tabs>
        </div >
    );
}

export default BabyDetailsAsha;