import React, { Component } from "react";
import ReactApexChart from 'react-apexcharts';

export default class EosLosLineGraph extends Component {
    constructor(props) {

        super(props);
        this.state = {

            series: [{
                name: "EOS",
                data: this.props.eos_count
            },
            {
                name: "LOS",
                data: this.props.los_count
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
                colors: ['#00ffff', '#58D68D'],
                legend: {
                    position: 'top',
                  },
                fill: {
                    colors: ['#00ffff', '#58D68D']
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
                        text: 'Count of EOS & LOS'
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

