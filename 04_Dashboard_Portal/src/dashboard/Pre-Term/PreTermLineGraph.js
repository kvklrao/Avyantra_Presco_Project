import React, { Component } from "react";
import ReactApexChart from 'react-apexcharts';

class PreTermLineGraph extends Component {
    constructor(props) {

        super(props);
        this.state = {

            series: [{
                name: "Pre-Term Yes",
                data: this.props.preterm_yes_count
            },
            {
                name: "Pre-Term No",
                data: this.props.preterm_no_count
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
                    categories: this.props.xaxis_dates,
                },
                yaxis: {
                    title: {
                        text: 'Count (Readings)'
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
                type="line" />
        );
    }
}

export default PreTermLineGraph;

