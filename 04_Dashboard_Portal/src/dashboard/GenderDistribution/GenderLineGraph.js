import React, { Component } from "react";
import ReactApexChart from 'react-apexcharts';

class GenderLineGraph extends Component {
    constructor(props) {

        super(props);
        this.state = {

            series: [{
                name: "Male",
                data: this.props.male_count
            },
            {
                name: "Female",
                data: this.props.female_count
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
                colors: ['#5e66ed', '#f395e6'],
                legend: {
                    position: 'top',
                  },
                fill: {
                    colors: ['#5e66ed', '#f395e6']
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
                    categories: this.props.xaxis_dates,
                },
                yaxis: {
                    title: {
                        text: 'Count of Male & Female'
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
                style={{marginTop:30}}
                type="line" />
        );
    }
}

export default GenderLineGraph;

