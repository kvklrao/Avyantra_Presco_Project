import React, { Component } from "react";
import ReactApexChart from 'react-apexcharts';

const centered = {
    margin: '5%',
    marginTop: '0.5%'
}

class DashboardLineChart extends Component {
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
                    // width: '100%',
                    type: 'line',
                    toolbar: {
                        show: false,
                    },
                    zoom: {
                        enabled: false
                    },
                },
                dataLabels: {
                    enabled: false
                },
                colors: ['#FFA500', '#32CD32'],
                legend: {
                    position: 'top',
                  },
                fill: {
                    colors: ['#FFA500', '#32CD32']
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
                        opacity: 0.3
                    },
                },
                xaxis: {
                    categories: this.props.sepsis_dates,
                },
                yaxis: {
                    title: {
                        text: 'Count (Readings)'
                    }
                }

            },
            // responsive: [
            //     {
            //         breakpoint: 800,
            //     }
            // ]
        }
    }

    render() {

        return (
            <div>
                <center>
                    <ReactApexChart
                        options={this.state.options}
                        series={this.state.series}
                        type="line" style={centered} />
                </center>
            </div>
        );
    }
}

export default DashboardLineChart;

