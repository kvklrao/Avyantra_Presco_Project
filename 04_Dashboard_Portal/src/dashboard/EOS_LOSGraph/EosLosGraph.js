import React, { Component } from "react";
import { Form, Button, Select, Row, Col, Card, Spin, Layout, Empty } from 'antd';
import 'bootstrap/dist/css/bootstrap.css';
import { DatePicker } from 'antd';
import EosLosLineGraph from "./EosLosLineGraph";
import EosLosPieGraph from "./EosLosPieGraph";
import axios from 'axios';
import 'antd/dist/antd.css';
import 'antd/dist/antd.less'
import moment from 'moment';
import {
    InboxOutlined
} from '@ant-design/icons';
import '../../Main/cardStyle.css'


const { MonthPicker, RangePicker, WeekPicker } = DatePicker;
const { Option } = Select;
const { Content } = Layout;


const mainDivStyle = {
    width: '100%',
    height: '100%'
}

const graphCardStyle = {
    marginTop: '2%', height: '100%'
}


let los_count = [], xaxis_dates = [], eos_count = [], rangedates = [], sum_eos_count = 0, sum_los_count = 0;
let startDate = '', endDate = '', quarterCal = '', errors = false;
export default class EosLosGraph extends Component {
    constructor(props) {
        super(props);

        this.state = {
            range: 4,
            startDate: '',
            endDate: '',
            data: [],
            isLoaded: true,
            apply_clicked: false,
        }
        this.handleChangeStartDate = this.handleChangeStartDate.bind(this);
        this.handleChangeEndDate = this.handleChangeEndDate.bind(this);
        this.handleRangeChange = this.handleRangeChange.bind(this);
        this.apply = this.apply.bind(this);
        this.refresh = this.refresh.bind(this);
        this.changeDates = this.changeDates.bind(this);
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

    handleRangeChange = value => {
        this.setState({ range: value });
    }


    async handleChangeStartDate(date, dateString) {

        startDate = dateString;
        await this.setState({ startDate: dateString });
        if (this.state.range == 2) {
            var month = dateString.substring(5, 7);
            var year = dateString.substring(0, 4);
            var monthStartDay = moment([year, month - 1, 1]).format("YYYY-MM-DD");
            const daysInMonth = moment(startDate).daysInMonth();
            const monthEndDay = moment(startDate).add(daysInMonth - 1, 'days').format("YYYY-MM-DD");
            await this.setState({ startDate: monthStartDay, endDate: monthEndDay });
        }
        if (this.state.range == 3) {
            var quarter = dateString.substring(6, 7);
            quarterCal = quarter;
            var year = dateString.substring(0, 4);
            var firstDate = moment(moment(year + '-01-01').toDate()).quarter(quarter).format("yyyy-MM-DD");
            let endMonth = 3 * parseInt(quarter) //The last month of the quarter
            /* Format the number of months */
            if (endMonth < 10)
                endMonth = '0' + endMonth
            else
                endMonth += ''

            let endMonthDays = moment(year + '-' + endMonth).daysInMonth(); // Last month days
            let endDays = year + '-' + endMonth + '-' + endMonthDays //Full year, month, day integration
            var endDate = moment(moment(endDays).toDate()).format("yyyy-MM-DD");
            await this.setState({ startDate: firstDate, endDate: endDate });
        }
        if (this.state.range == 4) {
            dateString = dateString + "-01-01"
            await this.setState({ startDate: dateString });
        }

    }

    async handleChangeEndDate(date, dateString) {
        if (this.state.range == 4) {
            dateString = dateString + "-12-31"
        }
        endDate = dateString;
        await this.setState({ endDate: dateString });
    }

    async changeDates(date, dateString) {
    }

    async refresh() {
        await this.setState({ startDate: '', endDate: '', selectValue: '', range: '' })
    }

    getDates(startDate, endDate) {
        var dateArray = [];
        var currentDate = moment(startDate);
        var stopDate = moment(endDate);
        while (currentDate <= stopDate) {
            dateArray.push(moment(currentDate).format('YYYY-MM-DD'))
            currentDate = moment(currentDate).add(1, 'days');
        }
        return dateArray;
    }

    apply = function () {
        this.setState({ isLoaded: false });
        // console.log("clicked apply");
        // console.log(this.state.startDate);
        // console.log(this.state.endDate);
        // console.log(this.state.selectValue);
        // console.log(this.state.range);

        if (this.state.range == 1) {
            var date1 = new Date(this.state.startDate);
            var date2 = new Date(this.state.endDate);
            var diffDays = parseInt((date2 - date1) / (1000 * 60 * 60 * 24), 10);
            if (diffDays >= 15) {
                errors = true;
                // console.log(errors)
            } else {
                errors = false;
            }
        }
        los_count = []; xaxis_dates = []; eos_count = [];
        rangedates = []; sum_eos_count = 0; sum_los_count = 0;
        if (errors == false) {
            axios.get(
                process.env.REACT_APP_URL + '/eosLosGraph?range=' + this.state.range + '&date_from=' +
                this.state.startDate + '&date_to=' + this.state.endDate +
                '&hospital_id=' + this.props.hospital_id + '&branch_id=' + this.props.branch_id +
                '&all_hospitals=' + localStorage.getItem('all_hospitals') + '&all_branches=' + localStorage.getItem('all_branches'),
                { headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') } }
            ).then(response => {
                // console.log("Success ========>", response);

                if (this.state.range == 1) {
                    // console.log("on select dates");
                    this.setState({ data: response.data.results });
                    rangedates = this.getDates(startDate, endDate);
                    for (var d = 0; d < rangedates.length; d++) {
                        for (var i = 0; i < this.state.data.length; i++) {
                            if (rangedates[d] === this.state.data[i].baby_adm_date) {
                                los_count[d] = this.state.data[i].los_count;
                                eos_count[d] = this.state.data[i].eos_count;
                            }
                            else {
                                if (los_count[d] == null) {
                                    los_count[d] = 0;
                                }
                                if (eos_count[d] == null) {
                                    eos_count[d] = 0;
                                }
                            }
                        }
                    }
                    for (var i = 0; i < los_count.length; i++) {
                        sum_eos_count = sum_eos_count + parseInt(los_count[i]);
                    }
                    for (var i = 0; i < eos_count.length; i++) {
                        sum_los_count = sum_los_count + parseInt(eos_count[i]);
                    }
                } else if (this.state.range == 2) {
                    // console.log("monthly");
                    let weekArray = [];
                    this.setState({ data: response.data.results2 });
                    for (var i = 0; i < this.state.data.length; i++) {
                        xaxis_dates[i] = this.state.data[i].week;
                        if (xaxis_dates[i - 1] !== xaxis_dates[i]) {
                            rangedates[i] = xaxis_dates[i];
                            weekArray[i] = "Week " + xaxis_dates[i];
                        }
                    }
                    rangedates = rangedates.filter(function (e) { return e != null; });
                    weekArray = weekArray.filter(function (e) { return e != null; });
                    for (var d = 0; d < rangedates.length; d++) {
                        for (var i = 0; i < this.state.data.length; i++) {
                            if (rangedates[d] === this.state.data[i].week) {
                                los_count[d] = this.state.data[i].los_count;
                                eos_count[d] = this.state.data[i].eos_count;
                            }
                            else {
                                if (los_count[d] == null) {
                                    los_count[d] = 0;
                                }
                                if (eos_count[d] == null) {
                                    eos_count[d] = 0;
                                }
                            }
                        }
                    }
                    for (var i = 0; i < los_count.length; i++) {
                        sum_eos_count = sum_eos_count + parseInt(los_count[i]);
                    }
                    for (var i = 0; i < eos_count.length; i++) {
                        sum_los_count = sum_los_count + parseInt(eos_count[i]);
                    }
                    rangedates = weekArray;
                } else if (this.state.range == 3) {
                    // console.log("quarterly");
                    let monthQArray = [];
                    this.setState({ data: response.data.results2 });
                    if (quarterCal == 1) {
                        rangedates = [1, 2, 3];
                        monthQArray = ["Jan", "Feb", "Mar"];
                    }
                    if (quarterCal == 2) {
                        rangedates = [4, 5, 6];
                        monthQArray = ["Apr", "May", "Jun"];
                    }
                    if (quarterCal == 3) {
                        rangedates = [7, 8, 9];
                        monthQArray = ["Jul", "Aug", "Sep"];
                    }
                    if (quarterCal == 4) {
                        rangedates = [10, 11, 12];
                        monthQArray = ["Oct", "Nov", "Dec"];
                    }

                    for (var d = 0; d < rangedates.length; d++) {
                        for (var i = 0; i < this.state.data.length; i++) {
                            // console.log(rangedates[d], this.state.data[i].baby_adm_date)
                            if (rangedates[d] === this.state.data[i].month) {
                                los_count[d] = this.state.data[i].los_count;
                                eos_count[d] = this.state.data[i].eos_count;
                            }
                            else {
                                if (los_count[d] == null) {
                                    los_count[d] = 0;
                                }
                                if (eos_count[d] == null) {
                                    eos_count[d] = 0;
                                }
                            }
                        }
                    }
                    for (var i = 0; i < los_count.length; i++) {
                        sum_eos_count = sum_eos_count + parseInt(los_count[i]);
                    }
                    for (var i = 0; i < eos_count.length; i++) {
                        sum_los_count = sum_los_count + parseInt(eos_count[i]);
                    }
                    rangedates = monthQArray;
                } else if (this.state.range == 4) {
                    // console.log("yearly");
                    this.setState({ data: response.data.results2 });
                    for (var i = 0; i < this.state.data.length; i++) {
                        xaxis_dates[i] = this.state.data[i].year;
                        if (xaxis_dates[i - 1] !== xaxis_dates[i]) {
                            rangedates[i] = xaxis_dates[i];
                        }
                    }
                    rangedates = rangedates.filter(function (e) { return e != null; });
                    for (var d = 0; d < rangedates.length; d++) {
                        for (var i = 0; i < this.state.data.length; i++) {
                            if (rangedates[d] === this.state.data[i].year) {
                                los_count[d] = this.state.data[i].los_count;
                                eos_count[d] = this.state.data[i].eos_count;
                            }
                            else {
                                if (los_count[d] == null) {
                                    los_count[d] = 0;
                                }
                                if (eos_count[d] == null) {
                                    eos_count[d] = 0;
                                }
                            }
                        }
                    }
                    for (var i = 0; i < los_count.length; i++) {
                        sum_eos_count = sum_eos_count + parseInt(los_count[i]);
                    }
                    for (var i = 0; i < eos_count.length; i++) {
                        sum_los_count = sum_los_count + parseInt(eos_count[i]);
                    }
                }
                this.setState({ isLoaded: true });
                // console.log(rangedates)
            })
                .catch(error => {
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
                    padding: 24,
                    minHeight: '80vh',
                }}>
                <div style={mainDivStyle}>
                    <Card>
                        <Form>
                            <Row>

                                <Col xl={4} xs={24} sm={12} md={12} lg={8} xxl={4}>
                                    <div style={{ padding: 10 }}>
                                        <h6>Range</h6>
                                        <Select style={{ width: '100%' }} placeholder="Select Range"
                                            onChange={this.handleRangeChange} allowClear>
                                            <Option value="1">Select Dates</Option>
                                            <Option value="2">Monthly</Option>
                                            <Option value="3">Quarterly</Option>
                                            <Option value="4">Yearly</Option>
                                        </Select>
                                    </div>
                                </Col>

                                {this.state.range == 1 ?
                                    <Col xl={4} xs={24} sm={12} md={12} lg={8} xxl={4}>
                                        <div style={{ padding: 10 }}>
                                            <h6>From</h6>
                                            <DatePicker onChange={this.handleChangeStartDate} allowClear style={{ width: '100%' }}
                                                disabledDate={d => !d || d.isAfter(new Date())} />
                                        </div>
                                    </Col>
                                    : null}
                                {this.state.range == 1 ?
                                    <Col xl={4} xs={24} sm={12} md={12} lg={8} xxl={4}>
                                        <div style={{ padding: 10 }}>
                                            <h6>To</h6>
                                            <DatePicker onChange={this.handleChangeEndDate} style={{ width: '100%' }}
                                                disabledDate={d => !d || d.isBefore(this.state.startDate) || d.isAfter(new Date())} /></div>
                                    </Col>
                                    : null}

                                {this.state.range == 2 ?
                                    <Col xl={4} xs={24} sm={12} md={12} lg={8} xxl={4}>
                                        <div style={{ padding: 10 }}>
                                            <h6>Choose Month</h6>
                                            <DatePicker onChange={this.handleChangeStartDate} allowClear picker="month" style={{ width: '100%' }}
                                                disabledDate={m => !m || m.isAfter(new Date())} />
                                        </div>
                                    </Col>
                                    : null}

                                {this.state.range == 3 ?
                                    <Col xl={4} xs={24} sm={12} md={12} lg={8} xxl={4}>
                                        <div style={{ padding: 10 }}>
                                            <h6>Choose Quarter</h6>
                                            <DatePicker onChange={this.handleChangeStartDate} allowClear picker="quarter" style={{ width: '100%' }}
                                                disabledDate={q => !q || q.isAfter(new Date())} />
                                        </div>
                                    </Col>
                                    : null}

                                {this.state.range == 4 ?
                                    <Col xl={4} xs={24} sm={12} md={12} lg={8} xxl={4}>
                                        <div style={{ padding: 10 }}>
                                            <h6>From</h6>
                                            <DatePicker onChange={this.handleChangeStartDate} allowClear picker="year" style={{ width: '100%' }}
                                                disabledDate={y => !y || y.isAfter(new Date())} />
                                        </div>
                                    </Col>
                                    : null}
                                {this.state.range == 4 ?
                                    <Col xl={4} xs={24} sm={12} md={12} lg={8} xxl={4}>
                                        <div style={{ padding: 10 }}>
                                            <h6>To</h6>
                                            <DatePicker onChange={this.handleChangeEndDate} picker="year" style={{ width: '100%' }}
                                                disabledDate={y => !y || y.isAfter(new Date()) || y.isBefore(startDate)} /></div>
                                    </Col>
                                    : null}

                                <Col xl={4} xs={24} sm={12} md={12} lg={8} xxl={4}>
                                    <Button style={{ marginTop: 35, width: '100%' }} type="primary" onClick={this.apply}>Apply</Button> </Col>
                            </Row>
                            {errors ? <h6 style={{ color: 'red', fontSize: 10, marginLeft: '35%' }}>*Difference b/w dates should not be greater than 15</h6> : null}
                        </Form>
                    </Card>
                    {this.state.startDate != '' && this.state.endDate != '' ?
                        <>
                            {this.state.isLoaded ?
                                <div >
                                    {this.state.data.length == 0 ?
                                        <Empty style={{ margin: 100 }} image={Empty.PRESENTED_IMAGE_SIMPLE} /> :
                                        <Row justify='space-between'>
                                            <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
                                                <Card title="Percentage of EOS Vs LOS"
                                                    style={graphCardStyle}>
                                                    <EosLosPieGraph sum_eos_count={sum_eos_count}
                                                        sum_los_count={sum_los_count} />
                                                </Card>
                                            </Col>
                                            <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
                                                <Card title="EOS Vs LOS" style={graphCardStyle}>
                                                    <EosLosLineGraph los_count={los_count}
                                                        eos_count={eos_count}
                                                        xaxis_dates={rangedates}
                                                    >
                                                    </EosLosLineGraph>
                                                </Card>
                                            </Col>
                                        </Row>}
                                </div>
                                : <Spin size="large" style={{ margin: '50px' }}>
                                    <Row justify='space-between'>
                                        <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
                                            <Card title="Percentage of EOS Vs LOS"
                                                style={graphCardStyle}>
                                                <EosLosPieGraph sum_eos_count={sum_eos_count}
                                                    sum_los_count={sum_los_count} />
                                            </Card>
                                        </Col>
                                        <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
                                            <Card title="EOS Vs LOS" style={graphCardStyle}>
                                                <EosLosLineGraph los_count={los_count}
                                                    eos_count={eos_count}
                                                    xaxis_dates={rangedates}
                                                >
                                                </EosLosLineGraph>
                                            </Card>
                                        </Col>
                                    </Row>
                                </Spin>}
                        </> :
                        <Empty style={{ margin: 100 }}
                            image={Empty.PRESENTED_IMAGE_SIMPLE}
                            description="Please select filters to see the reports!" />
                    }
                </div>
            </Content>
        );
    }
}