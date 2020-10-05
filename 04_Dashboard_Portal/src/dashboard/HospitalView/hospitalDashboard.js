import React, { Component } from "react";
import { Form, Button, Select, Row, Col, Card, Spin } from 'antd';
import 'bootstrap/dist/css/bootstrap.css';
import avyantra from '../../images/avyantra.jpg';
// import DatePicker from 'react-datepicker';
import { DatePicker } from 'antd';
//import "react-datepicker/dist/react-datepicker.css";
//import SplitPane, { Pane } from 'react-split-pane';
import LineChart from "./LineChart";
import PieChart from "./PieChart";
import axios from 'axios';
import 'antd/dist/antd.css';
import 'antd/dist/antd.less'
import moment from 'moment';
import {
  InboxOutlined
} from '@ant-design/icons';

const { MonthPicker, RangePicker, WeekPicker } = DatePicker;
const { Option } = Select;

const navbarStyles = {
  width: '100%',
  backgroundColour: '#DCDCDC'
}
const mainDivStyle = {
  width: '100%',
  height: '100%'
}
const leftDivStyle = {
  backgroundColour: 'red'
}
const rightDivStyle = {
  backgroundColour: 'black'
}
const clear = {
  padding: 10,
  margin: 5,

}

let positive_sepsis_count = [], sepsis_dates = [], negative_sepsis_count = [], rangedates = [], sum_positive_sepsis_count = 0, sum_negative_sepsis_count = 0;
let startDate = '', endDate = '', quarterCal = '',errors= false;
export default class HospitalDashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectValue: "",
      range: 4,
      // startDate: moment(new Date()),
      // endDate: moment(new Date()).subtract(7, "days"),
      startDate: '2018-01-01',
      endDate: '2019-12-31',
      data: [],
      dataNegative: [],
      sepsisCasesCount: [],
      babyAdmissionDate: [],
      isLoaded: true,
      

    }
    this.handleBranchChange = this.handleBranchChange.bind(this);
    this.handleChangeStartDate = this.handleChangeStartDate.bind(this);
    this.handleChangeEndDate = this.handleChangeEndDate.bind(this);
    this.handleRangeChange = this.handleRangeChange.bind(this);
    this.apply = this.apply.bind(this);
    this.refresh = this.refresh.bind(this);
    this.changeDates = this.changeDates.bind(this);
  }

  componentDidMount() {
    this.apply()
  }

  // componentWillUnmount() {
  //   clearInterval(this.interval);
  // }

  handleRangeChange = value => {
    this.setState({ range: value });
  }

  handleBranchChange = value => {
    this.setState({ selectValue: value });
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
      console.log(year, month, monthStartDay, monthEndDay)
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
      console.log(firstDate, endDate)
      await this.setState({ startDate: firstDate, endDate: endDate });
    }
    if (this.state.range == 4) {
      dateString = dateString + "-01-01"
      await this.setState({ startDate: dateString });
    }

    console.log(this.state.startDate);
  }

  async handleChangeEndDate(date, dateString) {
    console.log(dateString)
    if (this.state.range == 4) {
      dateString = dateString + "-12-31"
    }
    endDate = dateString;
    await this.setState({ endDate: dateString });
    console.log(this.state.endDate);
  }

  async changeDates(date, dateString) {
    console.log(date, dateString);
  }

  async refresh() {
    console.log("refrresh");
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
    console.log("clicked apply");
    console.log(this.state.startDate);
    console.log(this.state.endDate);
    console.log(this.state.selectValue);
    console.log(this.state.range);
    if (this.state.range == 1) {
      var date1 = new Date(this.state.startDate);
      var date2 = new Date(this.state.endDate);
      var diffDays = parseInt((date2 - date1) / (1000 * 60 * 60 * 24), 10);
      if (diffDays >= 15) {
        console.log("coming here")
        errors =true;
        console.log(errors)
      }else {
        errors =false;
      }
    }

    console.log(errors);
    positive_sepsis_count = []; sepsis_dates = []; negative_sepsis_count = [];
    rangedates = []; sum_positive_sepsis_count = 0; sum_negative_sepsis_count = 0;
    if (errors == false) {
      axios.get(
        'http://localhost:8080/api/chart1?range=' + this.state.range + '&date_from=' + this.state.startDate + '&date_to=' + this.state.endDate,
        { headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') } }
      ).then(response => {
        console.log("Success ========>", response);

        if (this.state.range == 1) {
          console.log("on select dates");
          this.setState({ data: response.data.results });
          rangedates = this.getDates(startDate, endDate);
          for (var d = 0; d < rangedates.length; d++) {
            for (var i = 0; i < this.state.data.length; i++) {
              if (rangedates[d] === this.state.data[i].baby_adm_date) {
                if (this.state.data[i].sepsis_status == "Positive") {
                  positive_sepsis_count[d] = this.state.data[i].count;
                }
                if (this.state.data[i].sepsis_status == "Negative") {
                  negative_sepsis_count[d] = this.state.data[i].count;
                }
              }
              else {
                if (positive_sepsis_count[d] == null) {
                  positive_sepsis_count[d] = 0;
                }
                if (negative_sepsis_count[d] == null) {
                  negative_sepsis_count[d] = 0;
                }
              }
            }
          }
          console.log(positive_sepsis_count);
          for (var i = 0; i < positive_sepsis_count.length; i++) {
            sum_positive_sepsis_count = sum_positive_sepsis_count + positive_sepsis_count[i];
          }
          for (var i = 0; i < negative_sepsis_count.length; i++) {
            sum_negative_sepsis_count = sum_negative_sepsis_count + negative_sepsis_count[i];
          }
          console.log(sum_positive_sepsis_count, sum_negative_sepsis_count);
        } else if (this.state.range == 2) {
          console.log("monthly");
          let weekArray = [];
          this.setState({ data: response.data.results2 });
          for (var i = 0; i < this.state.data.length; i++) {
            sepsis_dates[i] = this.state.data[i].week;
            if (sepsis_dates[i - 1] !== sepsis_dates[i]) {
              rangedates[i] = sepsis_dates[i];
              weekArray[i] = "Week " + sepsis_dates[i];
            }
          }
          rangedates = rangedates.filter(function (e) { return e != null; });
          weekArray = weekArray.filter(function (e) { return e != null; });
          console.log(rangedates);
          for (var d = 0; d < rangedates.length; d++) {
            for (var i = 0; i < this.state.data.length; i++) {
              if (rangedates[d] === this.state.data[i].week) {
                if (this.state.data[i].sepsis_status == "Positive") {
                  positive_sepsis_count[d] = this.state.data[i].count;
                }
                if (this.state.data[i].sepsis_status == "Negative") {
                  negative_sepsis_count[d] = this.state.data[i].count;
                }
              }
              else {
                if (positive_sepsis_count[d] == null) {
                  positive_sepsis_count[d] = 0;
                }
                if (negative_sepsis_count[d] == null) {
                  negative_sepsis_count[d] = 0;
                }
              }
            }
          }
          for (var i = 0; i < positive_sepsis_count.length; i++) {
            sum_positive_sepsis_count = sum_positive_sepsis_count + positive_sepsis_count[i];
          }
          for (var i = 0; i < negative_sepsis_count.length; i++) {
            sum_negative_sepsis_count = sum_negative_sepsis_count + negative_sepsis_count[i];
          }
          rangedates = weekArray;
        } else if (this.state.range == 3) {
          console.log("quarterly");
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
                if (this.state.data[i].sepsis_status == "Positive") {
                  positive_sepsis_count[d] = this.state.data[i].count;
                }
                if (this.state.data[i].sepsis_status == "Negative") {
                  negative_sepsis_count[d] = this.state.data[i].count;
                }
              }
              else {
                if (positive_sepsis_count[d] == null) {
                  positive_sepsis_count[d] = 0;
                }
                if (negative_sepsis_count[d] == null) {
                  negative_sepsis_count[d] = 0;
                }
              }
            }
          }
          for (var i = 0; i < positive_sepsis_count.length; i++) {
            sum_positive_sepsis_count = sum_positive_sepsis_count + positive_sepsis_count[i];
          }
          for (var i = 0; i < negative_sepsis_count.length; i++) {
            sum_negative_sepsis_count = sum_negative_sepsis_count + negative_sepsis_count[i];
          }
          rangedates = monthQArray;
          console.log(rangedates);
        } else if (this.state.range == 4) {
          console.log("yearly");
          this.setState({ data: response.data.results2 });
          for (var i = 0; i < this.state.data.length; i++) {
            sepsis_dates[i] = this.state.data[i].year;
            if (sepsis_dates[i - 1] !== sepsis_dates[i]) {
              rangedates[i] = sepsis_dates[i];
            }
          }
          rangedates = rangedates.filter(function (e) { return e != null; });
          for (var d = 0; d < rangedates.length; d++) {
            for (var i = 0; i < this.state.data.length; i++) {
              if (rangedates[d] === this.state.data[i].year) {
                if (this.state.data[i].sepsis_status == "Positive") {
                  positive_sepsis_count[d] = this.state.data[i].count;
                }
                if (this.state.data[i].sepsis_status == "Negative") {
                  negative_sepsis_count[d] = this.state.data[i].count;
                }
              }
              else {
                if (positive_sepsis_count[d] == null) {
                  positive_sepsis_count[d] = 0;
                }
                if (negative_sepsis_count[d] == null) {
                  negative_sepsis_count[d] = 0;
                }
              }
            }
          }
          for (var i = 0; i < positive_sepsis_count.length; i++) {
            sum_positive_sepsis_count = sum_positive_sepsis_count + positive_sepsis_count[i];
          }
          for (var i = 0; i < negative_sepsis_count.length; i++) {
            sum_negative_sepsis_count = sum_negative_sepsis_count + negative_sepsis_count[i];
          }
        }
        this.setState({ isLoaded: true });
        console.log(rangedates)
      })
        .catch(error => {
          console.log("Error ========>", error);
        }
        )
    }
  }

  render() {
    return (
      <div style={mainDivStyle}>
        <Card>
          <Form>
            <Row gutter={16}>
              <Col span={4}>
                <div style={{ padding: 10 }}>
                  <h6>Branch</h6>
                  <Select style={{ width: '100%' }}
                    placeholder="Select Branch"
                    onChange={this.handleBranchChange} allowClear>
                    <Option value="Branch">Branch</Option>
                    <Option value="1">Lakidikapool</Option>
                  </Select>
                </div>
              </Col>

              <Col span={4}>
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
                <Col span={4}>
                  <div style={{ padding: 10 }}>
                    <h6>From</h6>
                    <DatePicker onChange={this.handleChangeStartDate} allowClear
                      disabledDate={d => !d || d.isAfter(new Date())} />
                  </div>
                </Col>
                : null}

              {this.state.range == 1 ?
                <Col span={4}>
                  <div style={{ padding: 10 }}>
                    <h6>To</h6>
                    <DatePicker onChange={this.handleChangeEndDate}
                      disabledDate={d => !d || d.isBefore(this.state.startDate) || d.isAfter(new Date())} /></div>
                </Col>
                : null}


              {this.state.range == 2 ?
                <Col span={4}>
                  <div style={{ padding: 10 }}>
                    <h6>Choose Month</h6>
                    <DatePicker onChange={this.handleChangeStartDate} allowClear picker="month"
                      disabledDate={m => !m || m.isAfter(new Date())} />
                  </div>
                </Col>
                : null}

              {this.state.range == 3 ?
                <Col span={4}>
                  <div style={{ padding: 10 }}>
                    <h6>Choose Quarter</h6>
                    <DatePicker onChange={this.handleChangeStartDate} allowClear picker="quarter"
                      disabledDate={q => !q || q.isAfter(new Date())} />
                  </div>
                </Col>
                : null}

              {this.state.range == 4 ?
                <Col span={4}>
                  <div style={{ padding: 10 }}>
                    <h6>From</h6>
                    <DatePicker onChange={this.handleChangeStartDate} allowClear picker="year"
                      disabledDate={y => !y || y.isAfter(new Date())} />
                  </div>
                </Col>
                : null}
              {this.state.range == 4 ?
                <Col span={4}>
                  <div style={{ padding: 10 }}>
                    <h6>To</h6>
                    <DatePicker onChange={this.handleChangeEndDate} picker="year"
                      disabledDate={y => !y || y.isAfter(new Date()) || y.isBefore(startDate)} /></div>
                </Col>
                : null}

              <Col span={2}>
                <Button style={{ marginTop: 35, width: '100%' }} type="primary" onClick={this.apply}>Apply</Button> </Col>
            </Row>
            {errors ? <h6 style={{ color: 'red', fontSize: 10, marginLeft: '35%' }}>*Difference b/w dates should not be greater than 15</h6> : null}
          </Form>
        </Card>
        {this.state.isLoaded ?
          <div >
            {this.state.data.length == 0 ?
              <div>
                <center><InboxOutlined style={{ fontSize: '100px', color: '#DCDCDC', margin: '10%' }} />
                  <h4 style={{ margin: '-10%', color: '#DCDCDC' }}>No Data</h4></center></div> :
              <Row gutter={16}>
                <Col span={12}>
                  <Card title="Percentage of cases of selected Interval"
                    style={{ marginTop: '2%' }}>
                    <PieChart sum_positive_sepsis_count={sum_positive_sepsis_count}
                      sum_negative_sepsis_count={sum_negative_sepsis_count} />
                  </Card>
                </Col>
                <Col span={12}>
                  <Card title="Sepsis status of selected Interval" style={{ marginTop: '2%' }}>
                    <LineChart positive_sepsis_count={positive_sepsis_count}
                      negative_sepsis_count={negative_sepsis_count}
                      sepsis_dates={rangedates}
                    >
                    </LineChart>
                  </Card>
                </Col>
              </Row>}
          </div>
          : <Spin size="large" style={{ margin: '50px' }}>
            <Row gutter={16}>
              <Col span={12}>
                <Card title="Percentage of cases of selected Interval"
                  style={{ marginTop: '2%' }}>
                  <PieChart sum_positive_sepsis_count={sum_positive_sepsis_count}
                    sum_negative_sepsis_count={sum_negative_sepsis_count} />
                </Card>
              </Col>
              <Col span={12}>
                <Card title="Sepsis status of selected Interval" style={{ marginTop: '2%' }}>
                  <LineChart positive_sepsis_count={positive_sepsis_count}
                    negative_sepsis_count={negative_sepsis_count}
                    sepsis_dates={rangedates}
                  >
                  </LineChart>
                </Card>
              </Col>
            </Row>
          </Spin>}
      </div>
    );
  }
}