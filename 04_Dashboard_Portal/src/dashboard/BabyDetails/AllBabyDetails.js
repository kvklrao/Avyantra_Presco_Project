import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Modal, Form, Tabs, Row, Col, DatePicker, Button, Card, Select, Radio, Collapse, Spin, Layout } from "antd";
import BabyDetailsAsha from '../BabyDetails/BabyDetailsAsha';
import CsvDownload from 'react-json-to-csv';
import { Scrollbars } from 'react-custom-scrollbars';
import {
    DownloadOutlined,
} from '@ant-design/icons';
import * as XLSX from 'xlsx';


function AllBabyDetails(props) {
    const [state, setstate] = useState([]);
    const [csvData, setCsvData] = useState([])
    const [loading, setloading] = useState(true);
    const [fetching, setFetching] = useState(false);
    const [babyData, setBabyData] = useState([]);
    const [visible, setVisible] = useState(false);
    const [babyRecordId, setBabyRecordId] = useState();
    const [reading, setReading] = useState();
    const [radioValue, setRadioValue] = useState(2);
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();
    const [apply_clicked, setApplyClicked] = useState(false);

    useEffect(() => {
        if (!apply_clicked) {
            getData();
        }
    }, [props.apply_clicked]);

    const { TabPane } = Tabs;
    const style = { padding: '2px 0' }
    const { Panel } = Collapse;
    const { Content } = Layout;


    const { MonthPicker, RangePicker, WeekPicker } = DatePicker;
    const { Option } = Select;

    const onClickCallTwoFunctions = () => {
        getDataByFilter();
        downloadAllData();
    }
    const getData = async () => {
        await axios.get(
            process.env.REACT_APP_URL + '/allBabyDetails?' +
            'hospital_id=' + props.hospital_id + '&branch_id=' + props.branch_id +
            '&all_hospitals=' + localStorage.getItem('all_hospitals') + '&all_branches=' + localStorage.getItem('all_branches'),
            { headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') } }
        ).then(
            res => {
                setloading(false);
                setstate(
                    res.data.results.map(row => ({
                        baby_medical_record_number: row.baby_medical_record_number,
                        reading: row.reading,
                        hospital_name: row.hospital_name,
                        hospital_branch_name: row.hospital_branch_name,
                        baby_date_of_admission: row.baby_date_of_admission,
                        id: row.id
                    }))
                );
            }
        );
    };

    const downloadAllData = async () => {
        setFetching(true);
        await axios.get(
            process.env.REACT_APP_URL + '/babyDetailsToCsv?asha=' + radioValue + '&from_date=' + startDate + '&to_date=' + endDate +
            '&hospital_id=' + props.hospital_id + '&branch_id=' + props.branch_id +
            '&all_hospitals=' + localStorage.getItem('all_hospitals') + '&all_branches=' + localStorage.getItem('all_branches'),
            { headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') } }
        ).then(
            res => {
                // console.log(res.data.results)
                setCsvData(res.data.results);
                setFetching(false);
                // console.log(csvData);
            }
        );

    };
    const exportToExcel = async () => {
        const fileName = 'Baby_Details.xlsx';

        const ws = XLSX.utils.json_to_sheet(csvData);
        const wb = XLSX.utils.book_new();
        const header = Object.keys(csvData[0]); // columns name

        var wscols = [];
        for (var i = 0; i < header.length; i++) {  // columns length added
            wscols.push({ wch: header[i].length })
        }
        ws['!cols'] = wscols;
        wb.Props = {
            Title: "Baby Details",
            Subject: "Avyantra",
            Author: "Avyantra Team",
            CreatedDate: new Date(),
        };
        XLSX.utils.book_append_sheet(wb, ws, 'baby_details');
        XLSX.writeFile(wb, fileName);

    }



    const getBabyData = async (baby_record, reading) => {
        setBabyRecordId(baby_record);
        setReading(reading);
        await axios.get(
            process.env.REACT_APP_URL + '/babyRecord?baby_record=' + baby_record + '&reading=' + reading,
            { headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') } }
        ).then(
            res => {
                setloading(false);
                setBabyData(
                    res.data.results
                );
                setVisible(true);
            }
        );
    };

    const getDataByFilter = async () => {
        await axios.get(
            process.env.REACT_APP_URL + '/allBabyDetails?from_date=' + startDate + '&to_date=' + endDate +
            '&hospital_id=' + props.hospital_id + '&branch_id=' + props.branch_id +
            '&all_hospitals=' + localStorage.getItem('all_hospitals') + '&all_branches=' + localStorage.getItem('all_branches'),
            { headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') } }
        ).then(
            res => {
                setloading(false);
                // console.log(res);
                setstate(
                    res.data.results2.map(row => ({
                        baby_medical_record_number: row.baby_medical_record_number,
                        reading: row.reading,
                        hospital_name: row.hospital_name,
                        hospital_branch_name: row.hospital_branch_name,
                        baby_date_of_admission: row.baby_date_of_admission,
                        id: row.id
                    }))
                );
            }
        );
    };

    const handleOk = e => {
        setVisible(false);
    };

    const handleCancel = e => {
        setVisible(false);
    };

    const onChange = e => {
        setRadioValue(e.target.value);
    };

    const handleChangeStartDate = (date, dateString) => {
        setStartDate(dateString);
    }

    const handleChangeEndDate = (date, dateString) => {
        setEndDate(dateString);
    }




    const columns = [
        {
            title: "Baby medical record",
            dataIndex: "baby_medical_record_number",
            width: 150,
            render: (text, record) => <a data-id={text} style={{ color: 'blue' }}
                onClick={() => getBabyData(record.baby_medical_record_number, record.reading)}>{text}</a>
        },
        {
            title: "Reading",
            dataIndex: "reading",
            width: 150,
        },
        {
            title: "Hospital",
            dataIndex: "hospital_name",
            width: 150
        },
        {
            title: "Branch",
            dataIndex: "hospital_branch_name",
            width: 150,
        },
        {
            title: "Date of Admission",
            dataIndex: "baby_date_of_admission",
            width: 150
        }
    ];

    return (
        <Content
            className="site-layout-background"
            style={{
                margin: '35px 25px',
                padding: 24,
                minHeight: '80vh',
            }}>
            <Card>
                <Form>
                    <Row justify="space-between">
                        <Col xl={4} xs={24} sm={12} md={12} lg={8} xxl={4} >
                            <div >
                                <h6>Show Asha Details</h6>
                                <Radio.Group onChange={onChange} value={radioValue} style={{ width: '100%' }}>
                                    <Radio value={1}>Yes</Radio>
                                    <Radio value={2}>No</Radio>
                                </Radio.Group>
                            </div>
                        </Col>

                        <Col xl={4} xs={24} sm={12} md={12} lg={8} xxl={4} >
                            <div >
                                <h6>From Date</h6>
                                <DatePicker onChange={handleChangeStartDate} allowClear disabledDate={d => !d || d.isAfter(new Date())} />
                            </div>
                        </Col>
                        <Col xl={4} xs={24} sm={12} md={12} lg={8} xxl={4} >
                            <div >
                                <h6>To Date</h6>
                                <DatePicker onChange={handleChangeEndDate} disabledDate={d => !d || d.isBefore(startDate) || d.isAfter(new Date())} /></div>
                        </Col>
                        {startDate != null & endDate != null ?
                            <Col xl={2} xs={24} sm={12} md={12} lg={8} xxl={2} >
                                <Button style={{ width: '100%', marginTop: 30 }} type="primary" onClick={onClickCallTwoFunctions}>Apply</Button> </Col> :
                            <Col xl={2} xs={24} sm={12} md={12} lg={8} xxl={2} ><Button style={{ width: '100%', marginTop: 30 }} type="primary" disabled onClick={getDataByFilter}>Apply</Button> </Col>}
                        {/* <Col span={2}> */}
                        {fetching 
                        ? <Spin size="small"></Spin> :
                            <Col span={4} style={{ marginLeft: '3%', marginTop: '1.5%' }}>
                                {localStorage.getItem('loginname') != "demonilofer" ?
                                <>{localStorage.getItem('loginname') != "demokkcth"?
                                <>{(csvData.length != 0 )? 
                                    <Button type="primary" shape="circle" icon={<DownloadOutlined />}
                                        onClick={exportToExcel} size="large" /> : null}</>:null}</>:null}</Col>}

                    </Row>
                </Form>
            </Card>
            {loading ? (
                "Loading"
            ) : (
                    <Table
                        columns={columns}
                        dataSource={state}
                        scroll={{ y: 'calc(80vh - 4em)' }}
                    />
                )}
            <Modal
                width='60%'
                title={'Baby Record Id: ' + babyRecordId + ', ' + reading}
                visible={visible}
                onOk={handleOk}
                onCancel={handleCancel}>
                <Collapse accordion>
                    {radioValue == 2 ?
                        <Panel header="All Details" key="1">
                            <Scrollbars style={{ width: "117vh", height: "45vh" }}>
                                <Tabs defaultActiveKey="1" >
                                    <TabPane tab="Baby Profile" key="1">
                                        {babyData.map((item, index) => {
                                            return <div key={index}>
                                                <Row gutter={16}>
                                                    <Col className="gutter-row" span={12}>
                                                        <div style={style}>Type of Record : {item.record_type}</div><hr />
                                                        <div style={style}>Admission Type : {item.baby_admission_type}</div><hr />
                                                        <div style={style}>Place of Birth (Pin Code) : {item.baby_place_of_birth_pin_code}</div><hr />
                                                        <div style={style}>Place of Birth (Name) : {item.baby_place_of_birth_name}</div><hr />
                                                        <div style={style}>Date of Birth : {item.baby_birth_date}</div><hr />
                                                        <div style={style}>Time of Birth (0-23 Hours) : {item.baby_birth_time_hours}</div><hr />
                                                        <div style={style}>Gender : {item.baby_gender}</div><hr />
                                                        <div style={style}>Date of Admission : {item.baby_date_of_admission}</div><hr />
                                                        <div style={style}>Age at Admission: {item.baby_age_of_admission}</div><hr />
                                                        <div style={style}>Apgar Score (1 min) : {item.baby_apgar_score_one_min}</div><hr />
                                                        <div style={style}>Apgar Score (5 min) : {item.baby_apgar_score_five_min}</div><hr />
                                                        <div style={style}>Apgar Score (10 min) : {item.baby_apgar_score_ten_min}</div><hr />
                                                        <div style={style}>Place of Delivery : {item.place_of_delivery}</div><hr />
                                                        <div style={style}>Gestational Age : {item.baby_gestational_age}</div><hr />
                                                        <div style={style}>Preterm : {item.baby_preterm}</div><hr />
                                                        <div style={style}>Weight at Birth : {item.baby_gestational_age_unit}</div><hr />
                                                        <div style={style}>Weight at Admission : {item.baby_weight_at_admission}</div><hr />
                                                        <div style={style}>Days of Sepsis Event : {item.baby_day_of_event}</div><hr />
                                                        <div style={style}>Diagnosis(Asphyxia) : </div><hr />
                                                        <div style={style}>Diagnosis(Pneumonia) : </div><hr />
                                                        <div style={style}>Diagnosis(UTI) : </div><hr />
                                                        <div style={style}>Diagnosis(Endocarditis) : </div><hr />
                                                        <div style={style}>Diagnosis(Septic Arthritis) : </div><hr />
                                                        <div style={style}>Diagnosis(Hypoxia) : </div><hr />
                                                        <div style={style}>Diagnosis(Thrombocytopenia) : {item.thrombocytopenia}</div><hr />
                                                        <div style={style}>Diagnosis(Skin Pustules) : {item.skin_pustules}</div><hr />
                                                        <div style={style}>Diagnosis(Other) : {item.baby_condition_other_if_suspect}</div>
                                                    </Col>
                                                    <Col className="gutter-row" span={12} >
                                                        <div style={style}>Diagnosis(Probable Sepsis) : </div><hr />
                                                        <div style={style}>Diagnosis(EOS/LOS/NA) : {item.baby_condition_yes_eos_los}</div><hr />
                                                        <div style={style}>Diagnosis(Meningitis) : </div><hr />
                                                        <div style={style}>Diagnosis(Umblical Sepsis) : </div><hr />
                                                        <div style={style}>Diagnosis(RDS) : {item.baby_condition_rds_yes_no}</div><hr />
                                                        <div style={style}>Diagnosis(Jaundice) : {item.baby_condition_jaundice_suspect}</div><hr />
                                                        <div style={style}>Diagnosis(LBW) : {item.baby_condition_lbw_suspect}</div><hr />
                                                        <div style={style}>Diagnosis(TTNB) : {item.baby_condition_ttnb_suspect}</div><hr />
                                                        <div style={style}>Diagnosis(LGA) : {item.baby_condition_lga_suspect}</div><hr />
                                                        <div style={style}>Diagnosis(SGA) : {item.baby_condition_sga_suspect}</div><hr />
                                                        <div style={style}>Diagnosis(AGA) : {item.baby_condition_aga_suspect}</div><hr />
                                                        <div style={style}>Diagnosis(Shock) : {item.baby_shock_aga_suspect}</div><hr />
                                                        <div style={style}>Diagnosis(Congenital Heart Disease) : {item.baby_condition_dextrocordia_suspect}</div><hr />
                                                        <div style={style}>Diagnosis(Anemia) : {item.baby_condition_anemia_suspect}</div><hr />
                                                        <div style={style}>Diagnosis(Perinatal Respiratory Depression) : {item.baby_respiratory_support}</div><hr />
                                                        <div style={style}>Diagnosis(Hypoglycemia) : {item.prelim_diagnosis_hypoglycemia}</div><hr />
                                                        <div style={style}>Diagnosis(Hypocalcemia) : {item.prelim_diagnosis_hypocalcemia}</div><hr />
                                                        <div style={style}>Diagnosis(Feeding Intolerence) : {item.feeding_intolerance}</div><hr />
                                                        <div style={style}>Diagnosis(Gastroenteritis) : {item.prelim_diagnosis_gastroenteritis}</div><hr />
                                                        <div style={style}>Diagnosis(Peritonitis) : </div><hr />
                                                        <div style={style}>Diagnosis(Soft Tissue Abscess) : </div><hr />
                                                        <div style={style}>Diagnosis(Coagulopathy) : </div><hr />
                                                        <div style={style}>Diagnosis(Bleeding Manifestation) :</div><hr />
                                                        <div style={style}>Diagnosis(Central Peripheral temperature difference) : </div><hr />
                                                        <div style={style}>Diagnosis(Medical Acidosis) : </div><hr />
                                                        <div style={style}>Diagnosis(Pulmonary Hemorrhage) : </div><hr />
                                                        <div style={style}>Diagnosis(Seizures) : {item.seizures}</div>
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
                                                        <div style={style}>Age : {item.mother_age}</div><hr />
                                                        <div style={style}>Weight : {item.mother_weight}</div><hr />
                                                        <div style={style}>Height : {item.mother_height}</div><hr />
                                                        <div style={style}>BMI : {item.mother_bmi}</div><hr />
                                                        <div style={style}>Haemoglobin : {item.mother_haemoglobin}</div><hr />
                                                        <div style={style}>Blood Pressure(Systolic) : {item.maternal_blood_pressure}</div><hr />
                                                        <div style={style}>Blood Pressure (Diastolic) : {item.maternal_blood_pressure_diastolic}</div><hr />
                                                        <div style={style}>Diabetes (Present) : {item.maternal_diabetes}</div><hr />
                                                        <div style={style}>Fever (Present) : {item.maternal_fever}</div><hr />
                                                        <div style={style}>Fever (Units) : {item.maternal_fever_unit}</div><hr />
                                                        <div style={style}>Fever Duration : {item.maternal_fever_basic}</div><hr />
                                                        <div style={style}>Thyroid Function : {item.maternal_thyroid_function}</div><hr />
                                                        <div style={style}>Thyroid Function (If Abnormal) : {item.maternal_thyroid_function_basic}</div><hr />
                                                        <div style={style}>Thyroid Function (Unit) : {item.maternal_thyroid_function_unit_basic_unit}</div><hr />
                                                        <div style={style}>More than 3 Vaginal Examinations During Labor : {item.more_than_3_vaginal_examinations_during_labor}</div><hr />
                                                        <div style={style}>Leaking PV : {item.leaking_pv}</div><hr />
                                                        <div style={style}>Rupture Of Membranes (ROM) : {item.rupture_of_membranes_rom}</div><hr />
                                                    </Col>
                                                    <Col className="gutter-row" span={12} >
                                                        <div style={style}>Rupture Of Membranes (Type) : {item.rupture_of_membranes_rom}</div><hr />
                                                        <div style={style}>Rupture Of Membranes(IF PROM) : {item.rupture_of_membranes_rom_one} </div><hr />
                                                        <div style={style}>Smelly Amniotic Fluid : {item.smelly_amniotic_fluid}</div><hr />
                                                        <div style={style}>Chorioamnionitis : {item.chorioamnionitis}</div><hr />
                                                        <div style={style}>GBS Infection : {item.gbs_infection}</div><hr />
                                                        <div style={style}>Urinary Tract Infection : {item.colonisation_or_urinary_tract_infection}</div><hr />
                                                        <div style={style}>Torch Infection : {item.torch_infections}</div><hr />
                                                        <div style={style}>Type Of Delivery : {item.type_of_delivery}</div><hr />
                                                        <div style={style}>Delayed Cord Clamping : {item.delayed_cord_clamping}</div><hr />
                                                        <div style={style}>Vaginal Swab Culture (Done) : {item.vaginal_swab_culture_two}</div><hr />
                                                        <div style={style}>Vaginal Swab Culture (Result) : {item.vaginal_swab_culture_three}</div><hr />
                                                        <div style={style}>Vaginal Swab Culture : {item.vaginal_swab_culture}</div><hr />
                                                        <div style={style}>Amniotic Fluid Culture (Done) : {item.amniotic_fluid_culture_three}</div><hr />
                                                        <div style={style}>Amniotic Fluid Culture (Result) : </div><hr />
                                                        <div style={style}>AF Culture (If Positive) : {item.amniotic_fluid_culture}</div><hr />
                                                        <div style={style}>Pregnancy-induced hypertension (PIH) : </div><hr />
                                                    </Col>
                                                </Row>
                                            </div>;
                                        })}
                                    </TabPane>
                                    <TabPane tab="Baby Appearance" key="3">
                                        {babyData.map((item, index) => {
                                            return <div key={index}>
                                                <Row gutter={16}>
                                                    <Col className="gutter-row" span={12}>
                                                        <div style={style}>Record Id : </div><hr />
                                                        <div style={style}>Time of Reading (0-23 Hours) : {item.time_of_reading_hours}</div><hr />
                                                        <div style={style}>Appearance : {item.baby_appearance}</div><hr />
                                                        <div style={style}>Cry Sound : {item.baby_cry_sound}</div><hr />
                                                        <div style={style}>Hypotonia Muscular Response (1 min after birth) : {item.hypotonia_muscular_response_one_min_after_birth}</div><hr />
                                                        <div style={style}>Excessive Sleeping : {item.excessive_sleeping}</div><hr />
                                                        <div style={style}>Hypothermia (Units) : </div><hr />
                                                        <div style={style}>Presence Of Convulsions : {item.baby_presence_of_convulsions}</div><hr />
                                                        <div style={style}>Breast Feeding Initiation : {item.breast_feeding_initiation}</div><hr />
                                                        <div style={style}>Umbilical Redness : </div><hr />
                                                        <div style={style}>Umbilical Discharge : {item.breast_feeding_initiation}</div><hr />
                                                    </Col>
                                                    <Col className="gutter-row" span={12} >
                                                        <div style={style}>Reading Date : {item.reading_date}</div><hr />
                                                        <div style={style}>Weight of Baby : {item.baby_weight_at_birth}</div><hr />
                                                        <div style={style}>Skin Colour : {item.baby_skin_colour}</div><hr />
                                                        <div style={style}>Cry Sound(If not cried) : {item.baby_cry_sound_status}</div><hr />
                                                        <div style={style}>Hypotonia Muscular Response (5 min after birth) : {item.hypotonia_muscular_response_five_min_after_birth}</div><hr />
                                                        <div style={style}>Hypothermia : {item.hypothermia}</div><hr />
                                                        <div style={style}>Feeding Status : {item.baby_feeding_status}</div><hr />
                                                        <div style={style}>Jaundice (Present) : {item.baby_jaundice}</div><hr />
                                                        <div style={style}>Kangaroo Mother Care : {item.kangaroo_mother_care}</div><hr />
                                                        <div style={style}>Umbilical Enduration : </div><hr />
                                                        <div style={style}>Skin Pustules (greater than 5) : {item.skin_pustules}</div><hr />
                                                    </Col>
                                                </Row>
                                            </div>;
                                        })}
                                    </TabPane>
                                    <TabPane tab="Baby Respiratory Function" key="4">
                                        {babyData.map((item, index) => {
                                            return <div key={index}>
                                                <Row gutter={16}>
                                                    <Col className="gutter-row" span={12}>
                                                        <div style={style}>Record Id : </div><hr />
                                                        <div style={style}>Grunting : {item.grunting}</div><hr />
                                                        <div style={style}>Retraction : {item.retraction}</div><hr />
                                                        <div style={style}>Oxygen Saturation : {item.oxygen_saturation}</div><hr />
                                                        <div style={style}>Chest In-drawing : {item.baby_chest_indrawing}</div><hr />
                                                        <div style={style}>X-Ray Result : {item.x_ray_result}</div><hr />
                                                        <div style={style}>Apnea Status (Presence) : {item.apnea_status}</div><hr />
                                                        <div style={style}>Respiratory Support (Yes/No) : {item.baby_respiratory_support}</div><hr />
                                                    </Col>
                                                    <Col className="gutter-row" span={12} >
                                                        <div style={style}>Groaning : {item.groaning}</div><hr />
                                                        <div style={style}>Stridor : {item.stridor}</div><hr />
                                                        <div style={style}>Fast Breathing : {item.fast_breathing}</div><hr />
                                                        <div style={style}>Breathing Rate : {item.breathing_rate}</div><hr />
                                                        <div style={style}>X-Ray Status (Done) : {item.x_ray_status_done}</div><hr />
                                                        <div style={style}>X-Ray Diagnosis (if Abnormal) : {item.x_ray_diagnosis_any_other}</div><hr />
                                                        <div style={style}>Apnea Diagnosis : {item.apnea_diagnosis}</div><hr />
                                                        <div style={style}>Respiratory Support (Type) : {item.baby_respiratory_support_if_yes}</div><hr />
                                                    </Col>
                                                </Row>
                                            </div>;
                                        })}
                                    </TabPane>
                                    <TabPane tab="Baby Cardio Vascular Function" key="5">
                                        {babyData.map((item, index) => {
                                            return <div key={index}>
                                                <Row gutter={16}>
                                                    <Col className="gutter-row" span={12}>
                                                        <div style={style}>Record Id :</div><hr />
                                                        <div style={style}>Urine Output : {item.urine_output}</div><hr />
                                                        <div style={style}>BP (Diastolic) : </div><hr />
                                                        <div style={style}>Capillary Refill : {item.capillary_refill_unit}</div><hr />
                                                        <div style={style}>Cool Peripheries : {item.cool_peripheries}</div><hr />
                                                        <div style={style}>2D Echo Result (If Yes) : {item.two_d_echo_done_if_yes}</div><hr />
                                                        <div style={style}>Central Lines(Yes/No/NA) : </div><hr />
                                                        <div style={style}>Central Lines(Insert Date) : </div><hr />
                                                        <div style={style}>Infusion of Blood Products : {item.infusion_of_blood_products}</div><hr />
                                                    </Col>
                                                    <Col className="gutter-row" span={12} >
                                                        <div style={style}>Heart Rate : {item.heart_rate}</div><hr />
                                                        <div style={style}>BP (Systolic) : </div><hr />
                                                        <div style={style}>BP (Mean Arterial) : {item.baby_blood_pressure_mean_arterial_bp}</div><hr />
                                                        <div style={style}>Low Peripheral Pulse Volume : {item.low_peripheral_pulse_volume}</div><hr />
                                                        <div style={style}>2D Echo (Done) : {item.two_d_echo_done}</div><hr />
                                                        <div style={style}>Ionotropes : {item.baby_on_ionotropes}</div><hr />
                                                        <div style={style}>Central Lines : {item.central_line}</div><hr />
                                                        <div style={style}>Central Lines(Removed Date) : </div><hr />
                                                    </Col>
                                                </Row>
                                            </div>;
                                        })}
                                    </TabPane>
                                    <TabPane tab="Baby CNS Function" key="6">
                                        {babyData.map((item, index) => {
                                            return <div key={index}>
                                                <Row gutter={16}>
                                                    <Col className="gutter-row" span={12}>
                                                        <div style={style}>Record Id : </div><hr />
                                                        <div style={style}>Seizures : {item.seizures}</div><hr />
                                                        <div style={style}>AF Bulge : {item.af_bulge}</div><hr />
                                                    </Col>
                                                    <Col className="gutter-row" span={12} >
                                                        <div style={style}>Features of Encephalopathy : {item.features_of_encephalopathy}</div><hr />
                                                        <div style={style}>Abnormal Movements like Tonic Posturing : {item.abnormal_movements_like_tonic_posturing}</div><hr />
                                                        <div style={style}>Baby Movement with Stimulation : </div><hr />
                                                    </Col>
                                                </Row>
                                            </div>;
                                        })}
                                    </TabPane>
                                    <TabPane tab="Baby GI Tract Function" key="7">
                                        {babyData.map((item, index) => {
                                            return <div key={index}>
                                                <Row gutter={16}>
                                                    <Col className="gutter-row" span={12}>
                                                        <div style={style}>Record Id : </div><hr />
                                                        <div style={style}>Frequency of Stools : {item.frequency_of_stools}</div><hr />
                                                        <div style={style}>Vomiting : {item.vomiting}</div><hr />
                                                    </Col>
                                                    <Col className="gutter-row" span={12} >
                                                        <div style={style}>Abdominal Distension : {item.abdominal_dystension}</div><hr />
                                                        <div style={style}>Diarrhea : {item.diarrhea}</div><hr />
                                                        <div style={style}>Feeding Intolerance : {item.feeding_intolerance}</div><hr />
                                                    </Col>
                                                </Row>
                                            </div>;
                                        })}
                                    </TabPane>
                                    <TabPane tab="Baby Investigations" key="8">
                                        {babyData.map((item, index) => {
                                            return <div key={index}>
                                                <Row gutter={16}>
                                                    <Col className="gutter-row" span={12}>
                                                        <div style={style}>Record Id : </div><hr />
                                                        <div style={style}>Thyroid Result : {item.baby_thyroid_result}</div><hr />
                                                        <div style={style}>Haemoglobin Level : {item.baby_haemoglobin_levels}</div><hr />
                                                        <div style={style}>C-Reactive Protein Result : {item.baby_c_reactive_protien_levels}</div><hr />
                                                        <div style={style}>Procalcitonin : {item.baby_procalcitonin_levels}</div><hr />
                                                        <div style={style}>Activated Partial Prothrombin :</div><hr />
                                                        <div style={style}>Absolute Neutrophil Count : {item.absolute_neutrophil_count}</div><hr />
                                                        <div style={style}>Thrombocytopenia (Platelet Count) : {item.thrombocytopenia}</div><hr />
                                                        <div style={style}>Urine culture test : {item.urine_culture_test}</div><hr />
                                                        <div style={style}>Gram Positive Bacteria : {item.gram_positive_bacteria}</div><hr />
                                                        <div style={style}>Fungi : {item.fungi}</div><hr />
                                                        <div style={style}>Antibiotic Status : {item.antibiotic_status_value}</div><hr />
                                                        <div style={style}>Potassium (K) : {item.potassium}</div><hr />
                                                        <div style={style}>Calcium (Ca) : {item.calcium}</div><hr />
                                                        <div style={style}>Magnesium (Mg) : {item.magnesium}</div><hr />
                                                        <div style={style}>Creatinine : {item.creatinine}</div><hr />
                                                        <div style={style}>Bilirubin level : {item.bilirubin_levels}</div><hr />
                                                        <div style={style}>ECG - Arrhythmia (Present) : {item.arrhythmia}</div><hr />
                                                        <div style={style}>TSB Value (mg/dl) : {item.csf_culture_tsb_value}</div><hr />
                                                    </Col>
                                                    <Col className="gutter-row" span={12} >
                                                        <div style={style}>Thyroid Status : {item.baby_thyroid_status}</div><hr />
                                                        <div style={style}>Blood Glucose : {item.baby_blood_glucose}</div><hr />
                                                        <div style={style}>C-Reactive Protein Level : {item.baby_c_reactive_protien_levels}</div><hr />
                                                        <div style={style}>Micro ESR : {item.micro_esr}</div><hr />
                                                        <div style={style}>Prothrombin Type(PT) : </div><hr />
                                                        <div style={style}>Total Leucocytes Count : {item.total_leucocute_count}</div><hr />
                                                        <div style={style}>Immature to mature neutrophil ratios greater than 0.2 : {item.immature_to_mature_neutrophil_ratios}</div><hr />
                                                        <div style={style}>Urine test for Pus Cells : {item.urine_rest_for_pus_cells}</div><hr />
                                                        <div style={style}>Blood Culture Report : {item.blood_culture_report}</div><hr />
                                                        <div style={style}>Gram Negative Bacteria : {item.gram_negative_bacteria}</div><hr />
                                                        <div style={style}>Other Organism : {item.other_organism}</div><hr />
                                                        <div style={style}>Antibiotic Status : </div><hr />
                                                        <div style={style}>Sodium (Na) : {item.sodium}</div><hr />
                                                        <div style={style}>Chloride : </div><hr />
                                                        <div style={style}>Phosphate (PO4) : {item.phosphate}</div><hr />
                                                        <div style={style}>Urea : {item.urea}</div><hr />
                                                        <div style={style}>Lactate level : {item.lactate_levels}</div><hr />
                                                        <div style={style}>Cord pH : {item.cord_ph}</div><hr />
                                                        <div style={style}>CSF Culture Value : {item.csf_culture_tsb_value}</div><hr />
                                                    </Col>
                                                </Row>
                                            </div>;
                                        })}
                                    </TabPane>
                                    <TabPane tab="Antibiotic Administration" key="9">
                                        {babyData.map((item, index) => {
                                            return <div key={index}>
                                                <Row gutter={16}>
                                                    <Col className="gutter-row" span={12}>
                                                        <div style={style}>Record Id : </div><hr />
                                                        <div style={style}>Date of administration : {item.date_of_administration_of_antiobiotic}</div><hr />
                                                        <div style={style}>Antibiotic Name : {item.antibiotic_name}</div><hr />
                                                        <div style={style}>Blood Samples for Culture test : {item.date_of_blood_samples_sent_for_culture_test}</div><hr />
                                                        <div style={style}>Blood Sample Taken Prior to Antiobiotic administration : {item.blood_sample_taken_prior_to_antiobiotic_administration}</div><hr />
                                                    </Col>
                                                    <Col className="gutter-row" span={12} >
                                                        <div style={style}>Antibiotic Given : {item.antibiotic_given}</div><hr />
                                                        <div style={style}>Time of administration (0-23 Hours) : {item.time_of_administration_of_antiobiotic_hours}</div><hr />
                                                        <div style={style}>Antibiotic Name (Other) : {item.antibiotic_name_if_other}</div><hr />
                                                        <div style={style}>Time of Blood Samples (0-23 Hours) : {item.time_of_blood_samples_sent_for_culture_test_hours}</div><hr />
                                                    </Col>
                                                </Row>
                                            </div>;
                                        })}
                                    </TabPane>
                                    <TabPane tab="Final Diagnosis" key="10">
                                        {babyData.map((item, index) => {
                                            return <div key={index}>
                                                <Row gutter={16}>
                                                    <Col className="gutter-row" span={12}>
                                                        <div style={style}>Record Id : </div><hr />
                                                        <div style={style}>Days of Stay in Hospital : {item.days_of_stay_in_hospital}</div><hr />
                                                        <div style={style}>Diagnosis (Sepsis) : {item.final_diagnosis_sepsis}</div><hr />
                                                        <div style={style}>Diagnosis (Seizures) : {item.seizures}</div><hr />
                                                        <div style={style}>Diagnosis (TTNB) : {item.final_diagnosis_ttnb}</div><hr />
                                                        <div style={style}>Diagnosis (LBW) : {item.final_diagnosis_lbw}</div><hr />
                                                        <div style={style}>Diagnosis (Anemia) : {item.final_diagnosis_anemia}</div><hr />
                                                        <div style={style}>Diagnosis (Hypoglycemia) : {item.final_diagnosis_hypoglycemia}</div><hr />
                                                        <div style={style}>Diagnosis (Gastroenteritis) : {item.final_diagnosis_gastroenteritis}</div><hr />
                                                        <div style={style}>Diagnosis (Shock) : {item.final_diagnosis_shock}</div><hr />
                                                        <div style={style}>Diagnosis(Septic Arthritis) : </div><hr />
                                                        <div style={style}>Diagnosis(Peritonitis) : </div><hr />
                                                        <div style={style}>Diagnosis(Coagulopathy) : </div><hr />
                                                        <div style={style}>Diagnosis(Umblical Sepsis) : </div><hr />
                                                        <div style={style}>Diagnosis(Asphyxia) : </div><hr />
                                                        <div style={style}>Diagnosis(Central Peripheral temperature difference) : </div><hr />
                                                        <div style={style}>Diagnosis (Metabolic Acidosis) : </div><hr />
                                                        <div style={style}>Diagnosis(Pulmonary Hemorrhage) : </div><hr />
                                                        <div style={style}>Diagnosis (Skin Pustules) : {item.skin_pustules}</div><hr />
                                                    </Col>
                                                    <Col className="gutter-row" span={12} >
                                                        <div style={style}>Discharge Date : {item.baby_discharge_date}</div><hr />
                                                        <div style={style}>Discharge Status : </div><hr />
                                                        <div style={style}>Diagnosis (Meningitis) : </div><hr />
                                                        <div style={style}>Diagnosis (RDS) : {item.final_diagnosis_rds}</div><hr />
                                                        <div style={style}>Diagnosis (Jaundice) : {item.final_diagnosis_jaundice}</div><hr />
                                                        <div style={style}>Diagnosis (LGA/SGA/AGA) :</div><hr />
                                                        <div style={style}>Diagnosis (Congenital Heart Disease) : </div><hr />
                                                        <div style={style}>Diagnosis (Hypocalcemia) : {item.final_diagnosis_hypocalcemia}</div><hr />
                                                        <div style={style}>Diagnosis (Perinatal Respiratory Depression) : {item.final_diagnosis_perinatal_respiratory_depression}</div><hr />
                                                        <div style={style}>Diagnosis (Feeding Intolerence) : {item.final_diagnosis_feeding_intolerence}</div><hr />
                                                        <div style={style}>Diagnosis(Endocarditis) : </div><hr />
                                                        <div style={style}>Diagnosis(Soft Tissue Abscess) : </div><hr />
                                                        <div style={style}>Diagnosis(UTI) :</div><hr />
                                                        <div style={style}>Diagnosis(Bleeding Manifestation) : </div><hr />
                                                        <div style={style}>Diagnosis(Pneumonia) : </div><hr />
                                                        <div style={style}>Diagnosis (Hypoxia) :</div><hr />
                                                        <div style={style}>Diagnosis (EOS/LOS/NA) : {item.final_diagnosis_eos_los}</div><hr />
                                                        <div style={style}>Diagnosis(thrombocytopenia) : </div><hr />
                                                        <div style={style}>Diagnosis (Other) : </div><hr />
                                                    </Col>
                                                </Row>
                                            </div>;
                                        })}
                                    </TabPane>
                                </Tabs>
                            </Scrollbars>
                        </Panel>
                        :
                        <Panel header="ASHA Details" key="2">
                            <Scrollbars style={{ width: "117vh", height: "45vh" }}>
                                <BabyDetailsAsha baby_record={babyRecordId} reading={reading} />
                            </Scrollbars>
                        </Panel>}
                </Collapse>
            </Modal>
        </Content>
    );
}

export default AllBabyDetails;