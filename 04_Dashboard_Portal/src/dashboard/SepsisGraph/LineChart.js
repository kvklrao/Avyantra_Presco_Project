import React, { Component } from "react";
import ReactApexChart from 'react-apexcharts';

class LineChart extends Component {
    constructor(props) {

        super(props);
        this.state = {

            series: [{
                name: "Sepsis Positive",
                data: this.props.positive_sepsis_count
            },
            {
                name: "Sepsis Negative",
                data: this.props.negative_sepsis_count
            }
            ],
            options: {
                chart: {
                    type: 'line',
                    toolbar: {
                        show: false,
                    },
                    zoom: {
                        enabled: false
                    }
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
                        opacity: 0.5
                    },
                },
                xaxis: {
                    categories: this.props.sepsis_dates,
                },
                yaxis: {
                    title: {
                        text: 'Count of sepsis cases'
                    }
                }

            },
        }
    }

    render() {

        return (
            <ReactApexChart
                options={this.state.options}
                series={this.state.series}
                type="line"
                style={{marginTop:30}}
            />
        );
    }
}

export default LineChart;

