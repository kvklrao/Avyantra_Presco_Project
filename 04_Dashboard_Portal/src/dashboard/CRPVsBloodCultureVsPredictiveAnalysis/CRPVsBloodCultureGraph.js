import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Form, Row, Col, DatePicker, Button, Card, Select, Input, Spin, Layout } from "antd";
import {
    DownloadOutlined,
} from '@ant-design/icons';
import * as XLSX from 'xlsx';

function CRPVsBloodCultureGraph(props) {
    const [state, setstate] = useState([]);
    const [csvData, setCsvData] = useState([])
    const [loading, setloading] = useState(true);
    const [fetching, setFetching] = useState(false);
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();
    const [sepsisStatus, setSepsisStatus] = useState('Yes');
    const [bmr, setBmr] = useState();
    const [apply_clicked, setApplyClicked] = useState(false);
    useEffect(() => {
        if (!apply_clicked) {
            getData();
        }
    }, [props.apply_clicked]);

    const style = { padding: '2px 0' }
    const { Content } = Layout;

    const { MonthPicker, RangePicker, WeekPicker } = DatePicker;
    const { Option } = Select;
    const { Search } = Input;

    const getData = async (bmr) => {
        setFetching(true);
        await axios.get(
            process.env.REACT_APP_URL + '/crpVsBloodCulturePredictiveScore?bmr=' + bmr +
            '&hospital_id=' + props.hospital_id + '&branch_id=' + props.branch_id +
            '&all_hospitals=' + localStorage.getItem('all_hospitals') + '&all_branches=' + localStorage.getItem('all_branches'),
            { headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') } }
        ).then(
            res => {
                setloading(false);
                // console.log(res);
                setCsvData(res.data.results);
                setFetching(false);
                setstate(
                    res.data.results.map(row => ({
                        baby_medical_record_number: row.bmr,
                        id: row.id,
                        baby_date_of_admission: row.baby_adm_date,
                        hospital_name: row.hospital_name,
                        branch_name: row.hospital_branch_name,
                        crp_value: row.crp_value,
                        crp_status: row.crp_status,
                        sepsis_status: row.sepsis_status,
                        asha_sepsis_score: row.asha_sepsis_score,
                        R1: parseFloat(row.R1).toFixed(2),
                        R2: parseFloat(row.R2).toFixed(2),
                        R3: parseFloat(row.R3).toFixed(2),
                        R4: parseFloat(row.R4).toFixed(2),
                        R5: parseFloat(row.R5).toFixed(2),
                        R6: parseFloat(row.R6).toFixed(2),
                        R7: parseFloat(row.R7).toFixed(2),
                        R8: parseFloat(row.R8).toFixed(2),
                        R9: parseFloat(row.R9).toFixed(2),
                        R10: parseFloat(row.R10).toFixed(2),
                    }))
                );
            }
        );
    };

    const getDataByFilter = async () => {
        setFetching(true);
        await axios.get(
            process.env.REACT_APP_URL + '/crpVsBloodCulturePredictiveScore?bmr=' + bmr + '&sepsis_status=' + sepsisStatus +
            '&from_date=' + startDate + '&to_date=' + endDate +
            '&hospital_id=' + props.hospital_id + '&branch_id=' + props.branch_id +
            '&all_hospitals=' + localStorage.getItem('all_hospitals') + '&all_branches=' + localStorage.getItem('all_branches'),
            { headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') } }
        ).then(
            res => {
                setloading(false);
                // console.log(res);
                setCsvData(res.data.results2);
                setFetching(false);
                setstate(
                    res.data.results2.map(row => ({
                        baby_medical_record_number: row.bmr,
                        baby_date_of_admission: row.baby_adm_date,
                        hospital_name: row.hospital_name,
                        branch_name: row.hospital_branch_name,
                        crp_value: row.crp_value,
                        crp_status: row.crp_status,
                        sepsis_status: row.sepsis_status,
                        asha_sepsis_score: row.asha_sepsis_score,
                        R1: parseFloat(row.R1).toFixed(2),
                        R2: parseFloat(row.R2).toFixed(2),
                        R3: parseFloat(row.R3).toFixed(2),
                        R4: parseFloat(row.R4).toFixed(2),
                        R5: parseFloat(row.R5).toFixed(2),
                        R6: parseFloat(row.R6).toFixed(2),
                        R7: parseFloat(row.R7).toFixed(2),
                        R8: parseFloat(row.R8).toFixed(2),
                        R9: parseFloat(row.R9).toFixed(2),
                        R10: parseFloat(row.R10).toFixed(2),
                        id: row.id,
                    }))
                );
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
            Title: "CRP Vs Blood Culture Details",
            Subject: "Avyantra",
            Author: "Avyantra Team",
            CreatedDate: new Date(),
        };
        XLSX.utils.book_append_sheet(wb, ws, 'baby_details');
        XLSX.writeFile(wb, fileName);

    }


    const onChange = (value) => {
        setSepsisStatus(value);
    };

    const handleChangeBmr = (e) => {
        setBmr(e.target.value);
        getData(e.target.value);
    };

    const handleBranchChange = (value) => {
        // setStartDate(dateString);
    }

    const handleChangeStartDate = (date, dateString) => {
        setStartDate(dateString);
    }

    const handleChangeEndDate = (date, dateString) => {
        setEndDate(dateString);
    }




    const columns = [
        {
            title: "BMR",
            dataIndex: "baby_medical_record_number",
            width: 150,
        },
        {
            title: "Date of Admission",
            dataIndex: "baby_date_of_admission",
            width: 150
        },
        {
            title: "Hospital",
            dataIndex: "hospital_name",
            width: 150
        },
        {
            title: "Branch",
            dataIndex: "branch_name",
            width: 150,
        },
        {
            title: "CRP Value",
            dataIndex: "crp_value",
            width: 150
        },
        {
            title: "CRP Status",
            dataIndex: "crp_status",
            width: 150
        },
        {
            title: "Sepsis Status",
            dataIndex: "sepsis_status",
            width: 150
        },
        {
            title: "Asha Sepsis Score",
            dataIndex: "asha_sepsis_score",
            width: 150
        },
        {
            title: "R1",
            dataIndex: "R1",
            width: 150
        },
        {
            title: "R2",
            dataIndex: "R2",
            width: 150
        },
        {
            title: "R3",
            dataIndex: "R3",
            width: 150
        },
        {
            title: "R4",
            dataIndex: "R4",
            width: 150
        },
        {
            title: "R5",
            dataIndex: "R5",
            width: 150
        },
        {
            title: "R6",
            dataIndex: "R6",
            width: 150
        },
        {
            title: "R7",
            dataIndex: "R7",
            width: 150
        },
        {
            title: "R8",
            dataIndex: "R8",
            width: 150
        },
        {
            title: "R9",
            dataIndex: "R9",
            width: 150
        },
        {
            title: "R10",
            dataIndex: "R10",
            width: 150
        },

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
                        <Col xl={4} xs={24} sm={12} md={12} lg={8} xxl={4}>
                            <div>
                                <h6>Search BMR</h6>
                                <Search style={{ width: '100%' }}
                                    placeholder="input search text"
                                    value={bmr}
                                    onChange={handleChangeBmr}
                                    allowClear
                                />
                            </div>
                        </Col>

                        <Col xl={4} xs={24} sm={12} md={12} lg={8} xxl={4}>
                            <div>
                                <h6>Sepsis Status</h6>
                                <Select style={{ width: '100%' }}
                                    placeholder="Sepsis Status"
                                    onChange={onChange} allowClear>
                                    <Option value="Yes">Positive</Option>
                                    <Option value="No">Negative</Option>
                                </Select>
                            </div>
                        </Col>


                        <Col xl={4} xs={24} sm={12} md={12} lg={8} xxl={4}>
                            <div>
                                <h6>From Date</h6>
                                <DatePicker onChange={handleChangeStartDate} style={{ width: '100%' }} allowClear disabledDate={d => !d || d.isAfter(new Date())} />
                            </div>
                        </Col>
                        <Col xl={4} xs={24} sm={12} md={12} lg={8} xxl={4}>
                            <div>
                                <h6>To Date</h6>
                                <DatePicker onChange={handleChangeEndDate} style={{ width: '100%' }} disabledDate={d => !d || d.isBefore(startDate) || d.isAfter(new Date())} /></div>
                        </Col>
                        {startDate != null & endDate != null && sepsisStatus != null ?
                            <Col xl={4} xs={24} sm={12} md={12} lg={8} xxl={4}>
                                <Button style={{ width: '100%', marginTop: '17%' }} type="primary" onClick={getDataByFilter}>Apply</Button> </Col> :
                            <Col xl={4} xs={24} sm={12} md={12} lg={8} xxl={4}><Button style={{ width: '100%', marginTop: '17%' }} type="primary" disabled onClick={getDataByFilter}>Apply</Button> </Col>}
                        {/* <Col span={4}> */}

                        {fetching ? <Spin size="small"></Spin> : <Col xl={4} xs={24} sm={12} md={12} lg={8} xxl={4} style={{ marginLeft: '3%', marginTop: '1.5%' }}>
                            {(localStorage.getItem('loginname')!="demonilofer")?
                            <>{(localStorage.getItem('loginname')!="demokkcth")?
                            <Button type="primary" shape="circle" icon={<DownloadOutlined />} 
                            onClick={exportToExcel} size="large" />:null}</>:null}</Col>}

                    </Row>
                </Form>
            </Card>
            {loading ? (
                "Loading"
            ) : (
                    <Table
                        columns={columns}
                        dataSource={state}
                        // pagination={{ pageSize: 50 }}
                        scroll={{ y: 'calc(80vh - 4em)' }}
                    />
                )}
        </Content>
    );
}

export default CRPVsBloodCultureGraph;