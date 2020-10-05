import React, { Component } from "react";
import ReactApexChart from 'react-apexcharts';
import { Spin } from 'antd';
import HospitalDashboard  from './hospitalDashboard';
import { connect } from "react-redux";
const centered = {
    margin: '18%',
    marginLeft:'4%',
    marginTop:'5%'
}

class LineChart extends Component {
    constructor(props) {

        super(props);
        this.state = {
            
            series: [{
                name: "Positive",
                data: this.props.positive_sepsis_count
            },
            {
                name: "Negative",
                data: this.props.negative_sepsis_count
            }
            ],
            options: {
                chart: {
                    height: 350,
                    type: 'line',
                    zoom: {
                        enabled: false
                    }
                },
                dataLabels: {
                    enabled: false
                },
                stroke: {
                    curve: 'straight'
                },
                title: {
                    text: '',
                    align: 'left'
                },
                grid: {
                    row: {
                        colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
                        opacity: 0.5
                    },
                },
                xaxis: {
                    categories: this.props.sepsis_dates,
                }

            }
        }
    }

    render() {
        
        return (
            // <Spin tip="Loading..." >
                <div>
                    <center>
                        <ReactApexChart
                            options={this.state.options}
                            series={this.state.series}
                            type="line" width={440}
                            style={centered} />
                    </center>
                </div>
        //    </Spin>
        );
    }
}

export default LineChart;

