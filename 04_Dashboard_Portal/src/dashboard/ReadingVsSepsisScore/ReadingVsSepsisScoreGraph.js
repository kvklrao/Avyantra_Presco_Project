import React, { Component } from "react";
import { Form, Button, Select, Row, Col, Card, Spin, Layout, Input } from 'antd';
import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios';
import 'antd/dist/antd.css';
import 'antd/dist/antd.less'
import {
    InboxOutlined
} from '@ant-design/icons';
import ReadingVsSepsisScoreLineGraph from './ReadingVsSepsisScoreLineGraph'
import ScoreForSingleReading from "./ScoreForSingleReading";
import '../../Main/cardStyle.css'

const { Search } = Input;
const { Content } = Layout;
const { Option } = Select;


const mainDivStyle = {
    width: '100%',
    height: '100%'
}


let readings = [], sepsis_score = [];
let errors = false; let score = '';
export default class ReadingVsSepsisScoreGraph extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [],
            isLoaded: true,
            bmr: '',
            apply_clicked: false,
            readingType: 'Select Type',
            reading: '',
            bmrLoading: false,
            bmrArray: [],
        }
        this.apply = this.apply.bind(this);
        this.handleSearchChange = this.handleSearchChange.bind(this);
        this.handleReadingTypeChange = this.handleReadingTypeChange.bind(this);
        this.handleReadingChange = this.handleReadingChange.bind(this);
    }

    static getDerivedStateFromProps(props, state) {
        return { apply_clicked: props.apply_clicked }
    }

    componentDidMount() {
        this.apply()
    }

    componentDidUpdate(prevState) {
        if (prevState.apply_clicked !== this.state.apply_clicked) {
            this.apply()
        }
        return false;
    }

    handleReadingTypeChange(value) {
        this.setState({ readingType: value })
        this.apply();
    }

    handleReadingChange(value) {
        this.setState({ reading: value })
        this.apply();
    }

    async handleSearchChange(value) {
        await this.setState({ bmr: value, readingType: 'Select Type', reading: '' })
        score = '';
        // this.apply();
    }



    apply = function () {
        this.setState({ isLoaded: false });
        readings = []; sepsis_score = [];
        //to populate bmr numbers
        axios.get(
            process.env.REACT_APP_URL + '/bmrNumbers?&hospital_id=' + this.props.hospital_id +
            '&branch_id=' + this.props.branch_id + '&all_hospitals=' + localStorage.getItem('all_hospitals') +
            '+&all_branches=' + localStorage.getItem('all_branches'),
            { headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') } }
        ).then(response => {
            // console.log("Success ========>", response);
            this.setState({ bmrLoading: true, bmrArray: response.data.results })
        })
            .catch(error => {
                console.log("Error ========>", error);
            }
            )
        if (errors == false) {
            axios.get(
                process.env.REACT_APP_URL + '/readingVsSepsisScore?bmr=' + this.state.bmr +
                '&hospital_id=' + this.props.hospital_id + '&branch_id=' + this.props.branch_id +
                '&all_hospitals=' + localStorage.getItem('all_hospitals') + '&all_branches=' + localStorage.getItem('all_branches'),
                { headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') } }
            ).then(response => {
                // console.log("Success ========>", response);
                this.setState({ data: response.data.results })
                for (var i = 0; i < this.state.data.length; i++) {
                    var string1 = this.state.data[i].reading
                    var num = string1.substring(1)
                    readings[i] = parseInt(num);
                    sepsis_score[i] = this.state.data[i].sepsis_score;
                    if (this.state.reading == this.state.data[i].reading) {
                        score = parseFloat(this.state.data[i].sepsis_score).toFixed(1)
                    }
                }
                readings.sort(function (a, b) {
                    return a - b;
                });
                readings = readings.map(i => 'R' + i);
                // console.log(readings, sepsis_score)
                this.setState({ isLoaded: true });
            })
                .catch(error => {
                    this.setState({ isLoaded: true, bmrLoading: false });
                    console.log("Error ========>", error);
                }
                )
        }
    }

    render() {
        return (
            <Content
                className="site-layout-background"
                style={{
                    margin: '35px 25px',
                    padding: 10,
                    minHeight: '80vh',
                }}>
                <div style={mainDivStyle}>
                    <Card>
                        <Form>
                            <Row>
                                <Col xs={24} sm={12} md={12} lg={6} xl={6} xxl={6}>
                                    <div style={{ padding: 10 }}>
                                        <h6>Search BMR</h6>
                                        {this.state.bmrLoading ?
                                            <Select style={{ width: '100%' }} showSearch
                                                onChange={this.handleSearchChange} allowClear>
                                                {
                                                    this.state.bmrArray.map(index => {
                                                        return (
                                                            <Option value={index.baby_medical_record_number} >
                                                                {index.baby_medical_record_number}
                                                            </Option>
                                                        )
                                                    })
                                                }
                                            </Select> :
                                            <Select style={{ width: '100%' }} disabled
                                                onChange={this.handleSearchChange} allowClear>
                                                {
                                                    this.state.bmrArray.map(index => {
                                                        return (
                                                            <Option value={index.baby_medical_record_number} >
                                                                {index.baby_medical_record_number}
                                                            </Option>
                                                        )
                                                    })
                                                }
                                            </Select>}
                                    </div>
                                </Col>
                                <Col xs={24} sm={12} md={12} lg={6} xl={6} xxl={6}>
                                    <div style={{ padding: 10 }}>
                                        <h6>Reading Type</h6>
                                        <Select placeholder="Select Type" style={{ width: '100%' }}
                                            value={this.state.readingType}
                                            onChange={this.handleReadingTypeChange} allowClear>
                                            <Option value="1">Single Reading</Option>
                                            <Option value="2">All Readings</Option>
                                        </Select>
                                    </div>
                                </Col>
                                {this.state.readingType == 1 ?
                                    <Col xs={24} sm={12} md={12} lg={6} xl={6} xxl={6}>
                                        <div style={{ padding: 10 }}>
                                            <h6>Readings</h6>
                                            <Select placeholder="Select Reading" style={{ width: '100%' }}
                                                onChange={this.handleReadingChange} allowClear>
                                                {
                                                    readings.map(index => {
                                                        return (
                                                            <Option value={index} >
                                                                {index}
                                                            </Option>
                                                        )
                                                    })
                                                }
                                            </Select>
                                        </div>
                                    </Col> : null}



                                {/* <Col xs={24} sm={12} md={12} lg={8} xl={4} xxl={4}>
                                    <Button style={{ marginTop: 35, width: '100%' }} type="primary" onClick={this.apply}>Apply</Button> </Col> */}
                            </Row>
                            {errors ? <h6 style={{ color: 'red', fontSize: 10, marginLeft: '35%' }}>*Difference b/w dates should not be greater than 15</h6> : null}
                        </Form>

                    </Card>
                    {this.state.readingType == 2 ? <>
                        {this.state.isLoaded ?
                            <div >
                                {this.state.data.length == 0 ?
                                    <div>
                                        <center><InboxOutlined style={{ fontSize: '100px', color: '#DCDCDC', margin: '10%' }} />
                                            <h4 style={{ margin: '-10%', color: '#DCDCDC' }}>No Data</h4></center></div> :
                                    <Row justify="space-between">
                                        <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                                            <Card title="Reading Vs Sepsis Score" style={{ marginTop: '2%', height: '100%' }}>
                                                <ReadingVsSepsisScoreLineGraph
                                                    readings={readings}
                                                    sepsis_score={sepsis_score}
                                                >
                                                </ReadingVsSepsisScoreLineGraph>
                                            </Card>
                                        </Col>
                                    </Row>
                                }
                            </div>
                            : <Spin size="large" style={{ margin: '50px' }}>
                                <Row justify="space-between">
                                    <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                                        <Card title="Reading Vs Sepsis Score" style={{ marginTop: '2%', height: '100%' }}>
                                            <ReadingVsSepsisScoreLineGraph
                                                readings={readings}
                                                sepsis_score={sepsis_score}
                                            >
                                            </ReadingVsSepsisScoreLineGraph>
                                        </Card>
                                    </Col>
                                </Row>
                            </Spin>}</> :
                        <ScoreForSingleReading reading={this.state.reading} score={score} />}
                </div>
            </Content>
        );
    }
}