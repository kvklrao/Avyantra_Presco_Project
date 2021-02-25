import React, { Component } from 'react';
import { Form, Button, Select, Row, Col, Card, Spin, Layout, DatePicker, Collapse, Radio, Empty } from 'antd';
import DashboardPieChart from './DashboardPieChart'
import DashboardLineChart from './DashboardLineChart'
import {
  InboxOutlined
} from '@ant-design/icons';
import axios from 'axios';
import moment from 'moment';
import '../Main/cardStyle.css'

const { MonthPicker, RangePicker, WeekPicker } = DatePicker;
const { Option } = Select;
const { Content } = Layout;
const { Panel } = Collapse;

const rowStyle = {
  // margin: 20,
  marginTop: 40,
  marginBottom: 40
}
const colStyle = {
  // marginLeft: 25
}
const cardStyle = {
  // width: 120,
  height: 100,
  // padding: 20,
  borderRadius: 10,
  background: 'linear-gradient(150deg, #add8e6 5%,#add8e6 100%)'
}
const cardStyle1 = {
  // width: '120%',
  height: 100,
  // padding: 20,
  borderRadius: 10,
  background: 'linear-gradient(150deg, #ffb6c1 5%,#ffb6c1 100%)'
}
const cardStyle2 = {
  // width: '120%',
  height: 100,
  // padding: 20,
  borderRadius: 10,
  background: 'linear-gradient(150deg,  #FFA500 5%, #FFA500 100%)'
}
const cardStyle3 = {
  // width: '120%',
  height: 100,
  // padding: 20,
  borderRadius: 10,
  background: 'linear-gradient(150deg, #32CD32 5%,#32CD32 100%)'
}
const cardStyle4 = {
  // width: '120%',
  height: 100,
  // padding: 20,
  borderRadius: 10,
  background: 'linear-gradient(150deg, #FF4500 5%,#FF4500 100%)'
}

const textStyle = {
  textColor: '#fff'
}

let positive_sepsis_count = [], sepsis_dates = [], negative_sepsis_count = [];
let rangedates = [], sum_positive_sepsis_count = 0, sum_negative_sepsis_count = 0;
let startDate = '', endDate = '', quarterCal = '', errors = false;
export default class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      range: 4,
      startDate: new Date().getFullYear() + "-01-01",
      endDate: new Date().getFullYear() + "-12-31",
      data: [],
      dataNegative: [],
      sepsisCasesCount: [],
      babyAdmissionDate: [],
      isLoaded: true,
      isCardsLoaded: true,
      apply_clicked: false,
      counts: [],
      count_of_admitted: '',
      count_of_sepsis_negative: '',
      count_of_sepsis_positive: '',
      discharge_count: '',
    }
    this.onChange = this.onChange.bind(this);
  }

  async onChange(e) {
    await this.setState({ range: e.target.value });
    if (this.state.range == 0) {
      let d1 = moment(new Date()).format("YYYY-MM-DD");
      this.setState({ startDate: d1, endDate: d1 })
    } else if (this.state.range == 1) {
      let curr = new Date(); // get current date
      let first = curr.getDate() - curr.getDay();
      let last = first + 6; // last day is the first day + 6

      let firstday = moment(new Date(curr.setDate(first))).format('YYYY-MM-DD')
      let lastday = moment(new Date(curr.setDate(last))).format('YYYY-MM-DD')
      this.setState({ startDate: firstday, endDate: lastday })
    } else if (this.state.range == 2) {
      let date = new Date();
      let firstDay = moment(new Date(date.getFullYear(), date.getMonth(), 1)).format('YYYY-MM_DD');
      // let lastday = moment(new Date()).format('YYYY-MM-DD')
      let lastday = moment(new Date(date.getFullYear(), date.getMonth() + 1, 0)).format('YYYY-MM-DD');
      this.setState({ startDate: firstDay, endDate: lastday })
    } else if (this.state.range == 3) {
      let d = moment(new Date()).format('YYYY-MM-DD');
      let d1 = new Date()
      d1.setMonth(d1.getMonth() - 2);
      this.setState({ endDate: d, startDate: moment(d1).format('YYYY-MM-01') })
    } else if (this.state.range == 4) {
      let d1 = (new Date()).getFullYear() + "-01-01";
      let d2 = moment(new Date()).format('YYYY-MM-DD')
      this.setState({ startDate: d1, endDate: d2 })
    }
    this.apply();
  };

  static getDerivedStateFromProps(props, state) {
    return { apply_clicked: props.apply_clicked }
  }

  componentDidMount() {
    if (localStorage.getItem('super_user') == 1) {
      localStorage.setItem('all_hospitals', 1)
      localStorage.setItem('all_branches', 1)

    } else if (localStorage.getItem('hospital_access') == 1) {
      localStorage.setItem('all_hospitals', 0)
      localStorage.setItem('all_branches', 1)

    } else {
      localStorage.setItem('all_hospitals', 0)
      localStorage.setItem('all_branches', 0)
    }
    this.apply()
  }

  componentDidUpdate(prevState) {
    if (prevState.apply_clicked !== this.state.apply_clicked) {
      this.apply()
    }
    return false;
  }

  getDates(startDate, endDate) {
    let dateArray = [];
    let currentDate = moment(startDate);
    let stopDate = moment(endDate);
    while (currentDate <= stopDate) {
      dateArray.push(moment(currentDate).format('YYYY-MM-DD'))
      currentDate = moment(currentDate).add(1, 'days');
    }
    return dateArray
  }

  getMonthDates(startDate, endDate) {
    var start = startDate.split('-');
    var end = endDate.split('-');
    var startYear = parseInt(start[0]);
    var endYear = parseInt(end[0]);
    var dates = [];

    for (var i = startYear; i <= endYear; i++) {
      var endMonth = i != endYear ? 11 : parseInt(end[1]) - 1;
      var startMon = i === startYear ? parseInt(start[1]) - 1 : 0;
      for (var j = startMon; j <= endMonth; j = j > 12 ? j % 12 || 11 : j + 1) {
        var month = j + 1;
        var displayMonth = month < 10 ? '0' + month : month;
        dates.push([i, displayMonth, '01'].join('-'));
      }
    }
    return dates;
  }

  async apply() {
    this.setState({ isLoaded: false, isCardsLoaded: false,
    count_of_admitted:0,discharge_count:0,count_of_sepsis_negative:0,count_of_sepsis_positive:0 });
    // console.log("clicked apply");
    // console.log(this.state.startDate);
    // console.log(this.state.endDate);
    // console.log(this.state.range);

    positive_sepsis_count = []; sepsis_dates = []; negative_sepsis_count = [];
    rangedates = []; sum_positive_sepsis_count = 0; sum_negative_sepsis_count = 0;
    await axios.get(
      process.env.REACT_APP_URL + '/cardsCount?range=' +
      this.state.range + '&date_from=' + this.state.startDate + '&date_to=' + this.state.endDate +
      '&hospital_id=' + this.props.hospital_id + '&branch_id=' + this.props.branch_id +
      '&all_hospitals=' + localStorage.getItem('all_hospitals') + '&all_branches=' + localStorage.getItem('all_branches'),
      { headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') } }
    ).then(
      res => {
        // console.log(res)
        if (this.state.range == 0 || this.state.range == 1) {
          this.setState({ counts: res.data.results, isCardsLoaded: true })
        } else {
          this.setState({ counts: res.data.results2, isCardsLoaded: true })
        }
        this.setState({
          count_of_admitted: this.state.counts[0].count_of_admitted,
          discharge_count: this.state.counts[0].discharge_count,
          count_of_sepsis_negative: this.state.counts[0].count_of_sepsis_negative,
          count_of_sepsis_positive: this.state.counts[0].count_of_sepsis_positive
        })
      }
    ).catch(error => {
      console.log("Error ========>", error);
    }
    )

    if (errors == false) {
      // console.log(process.env.REACT_APP_URL + '/chart1?range=' +
      //   this.state.range + '&date_from=' + this.state.startDate + '&date_to=' + this.state.endDate +
      //   '&hospital_id=' + this.props.hospital_id + '&branch_id=' + this.props.branch_id +
      //   '&all_hospitals=' + localStorage.getItem('all_hospitals') + '&all_branches=' + localStorage.getItem('all_branches'))
      await axios.get(
        process.env.REACT_APP_URL + '/chart1?range=' +
        this.state.range + '&date_from=' + this.state.startDate + '&date_to=' + this.state.endDate +
        '&hospital_id=' + this.props.hospital_id + '&branch_id=' + this.props.branch_id +
        '&all_hospitals=' + localStorage.getItem('all_hospitals') + '&all_branches=' + localStorage.getItem('all_branches'),
        { headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') } }
      ).then(response => {
        // console.log("Success ========>", response);
        if (this.state.range == 1||this.state.range == 0) {
          // console.log("on select dates");
          this.setState({ data: response.data.results });
          rangedates = this.getDates(startDate, endDate);
          for (var d = 0; d < rangedates.length; d++) {
            for (var i = 0; i < this.state.data.length; i++) {
              if (rangedates[d] === this.state.data[i].baby_adm_date) {
                positive_sepsis_count[d] = this.state.data[i].sepsis_positive_count;
                negative_sepsis_count[d] = this.state.data[i].sepsis_negative_count;
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
          // console.log(positive_sepsis_count);
          for (var i = 0; i < positive_sepsis_count.length; i++) {
            // console.log(positive_sepsis_count[i])
            sum_positive_sepsis_count = sum_positive_sepsis_count + parseInt(positive_sepsis_count[i]);
          }
          for (var i = 0; i < negative_sepsis_count.length; i++) {
            sum_negative_sepsis_count = sum_negative_sepsis_count + parseInt(negative_sepsis_count[i]);
          }
          // console.log(sum_positive_sepsis_count, sum_negative_sepsis_count);
        } else if (this.state.range == 2) {
          // console.log("monthly");
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
          // console.log(rangedates);
          for (var d = 0; d < rangedates.length; d++) {
            for (var i = 0; i < this.state.data.length; i++) {
              if (rangedates[d] === this.state.data[i].week) {
                positive_sepsis_count[d] = this.state.data[i].sepsis_positive_count;
                negative_sepsis_count[d] = this.state.data[i].sepsis_negative_count;
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
            sum_positive_sepsis_count = sum_positive_sepsis_count + parseInt(positive_sepsis_count[i]);
          }
          for (var i = 0; i < negative_sepsis_count.length; i++) {
            sum_negative_sepsis_count = sum_negative_sepsis_count + parseInt(negative_sepsis_count[i]);
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
              if (rangedates[d] === this.state.data[i].month) {
                positive_sepsis_count[d] = this.state.data[i].sepsis_positive_count;
                negative_sepsis_count[d] = this.state.data[i].sepsis_negative_count;
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
            sum_positive_sepsis_count = sum_positive_sepsis_count + parseInt(positive_sepsis_count[i]);
          }
          for (var i = 0; i < negative_sepsis_count.length; i++) {
            sum_negative_sepsis_count = sum_negative_sepsis_count + parseInt(negative_sepsis_count[i]);
          }
          rangedates = monthQArray;
        } else if (this.state.range == 4) {
          // console.log("yearly");
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
                positive_sepsis_count[d] = this.state.data[i].sepsis_positive_count;
                negative_sepsis_count[d] = this.state.data[i].sepsis_negative_count;
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
            sum_positive_sepsis_count = sum_positive_sepsis_count + parseInt(positive_sepsis_count[i]);
          }
          for (var i = 0; i < negative_sepsis_count.length; i++) {
            sum_negative_sepsis_count = sum_negative_sepsis_count + parseInt(negative_sepsis_count[i]);
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
      <Content
        style={{
          margin: '10px 30px 30px 30px',
          minHeight: '80vh',
        }}>
        <Card title="Dashboard - Count of Sepsis Cases">
          <Radio.Group
            onChange={this.onChange} value={this.state.range}>
            <Radio value={0}>Daily</Radio>
            <Radio value={1}>Weekly</Radio>
            <Radio value={2}>Monthly</Radio>
            <Radio value={3}>Quarterly</Radio>
            <Radio value={4}>Yearly</Radio>
          </Radio.Group>
        </Card>
        <Row
          justify='space-between' style={rowStyle}>
          <Col xl={4} xs={24} sm={12} md={12} lg={8} xxl={4} className="gutter-row" style={colStyle}>
            <Card style={cardStyle}>
              <center><h6 style={textStyle}>Babies Admitted</h6>
                <h6 style={textStyle}>{this.state.isCardsLoaded ? this.state.count_of_admitted : null}</h6></center>
            </Card>
          </Col>
          <Col xl={4} xs={24} sm={12} md={12} lg={8} xxl={4} className="gutter-row" style={colStyle}>
            <Card style={cardStyle1} >
              <center><h6 style={textStyle}>Babies Discharged</h6>
                <h6 style={textStyle}>{this.state.isCardsLoaded ? this.state.discharge_count : null}</h6></center>
            </Card>
          </Col>
          <Col xl={4} xs={24} sm={12} md={12} lg={8} xxl={4} className="gutter-row" style={colStyle}>
            <Card style={cardStyle2}>
              <center><h6>Sepsis Positive</h6>
                <h6>{this.state.isCardsLoaded ? this.state.count_of_sepsis_positive : null}</h6></center>
            </Card>
          </Col>
          <Col xl={4} xs={24} sm={12} md={12} lg={8} xxl={4} className="gutter-row" style={colStyle}>
            <Card style={cardStyle3}>
              <center><h6>Sepsis Negative</h6>
                <h6>{this.state.isCardsLoaded ? this.state.count_of_sepsis_negative : null}</h6></center>
            </Card>
          </Col>
          <Col xl={4} xs={24} sm={12} md={12} lg={8} xxl={4} className="gutter-row" style={colStyle}>
            <Card style={cardStyle4}>
              <center><h6>Babies Deceased</h6>
                <h6>0</h6></center>
            </Card>
          </Col>
        </Row>
        {this.state.isLoaded ?
          <div >
            {this.state.data.length == 0 ?
              <Empty/>
              :
              <Row justify='space-between'>
                <Col xs={24} sm={24} md={24} lg={24} xl={10} xxl={10}>
                  <Card title="Percentage of Sepsis cases" style={{ height: '100%' }}
                  >
                    <DashboardPieChart sum_positive_sepsis_count={sum_positive_sepsis_count}
                      sum_negative_sepsis_count={sum_negative_sepsis_count} />
                  </Card>
                </Col>
                <Col xs={24} sm={24} md={24} lg={24} xl={13} xxl={13}
                >
                  <Card title="Sepsis status of selected Interval" style={{ height: '100%' }}
                  >
                    <DashboardLineChart positive_sepsis_count={positive_sepsis_count}
                      negative_sepsis_count={negative_sepsis_count}
                      sepsis_dates={rangedates}
                    >
                    </DashboardLineChart>
                  </Card>
                </Col>
              </Row>}
          </div>
          : <Spin size="large" style={{ margin: '50px' }}>
            <Row justify='space-between'>
              <Col xs={24} sm={24} md={24} lg={12} xl={10} xxl={10}>
                <Card title="Percentage of sepsis cases" style={{ height: '100%' }}
                >
                  <DashboardPieChart sum_positive_sepsis_count={sum_positive_sepsis_count}
                    sum_negative_sepsis_count={sum_negative_sepsis_count} />
                </Card>
              </Col>
              <Col xs={24} sm={24} md={24} lg={12} xl={13} xxl={13}>
                <Card title="Sepsis status of selected Interval" style={{ height: '100%' }}>
                  <DashboardLineChart positive_sepsis_count={positive_sepsis_count}
                    negative_sepsis_count={negative_sepsis_count}
                    sepsis_dates={rangedates}
                  >
                  </DashboardLineChart>
                </Card>
              </Col>
            </Row>
          </Spin>}
      </Content>
    )
  }
}