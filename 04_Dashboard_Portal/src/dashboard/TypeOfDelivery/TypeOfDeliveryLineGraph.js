import React, { Component } from "react";
import ReactApexChart from 'react-apexcharts';

class TypeOfDeliveryLineGraph extends Component {
    constructor(props) {

        super(props);
        this.state = {

            series: [{
                name: "Normal",
                data: this.props.normal_delivery_count
            },
            {
                name: "Cesarean",
                data: this.props.cesarean_delivery_count
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
                colors: ['#879ceb', '#eba487'],
                legend: {
                    position: 'top',
                  },
                fill: {
                    colors: ['#879ceb', '#eba487']
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
                        text: 'Count of Normal & Cesarean Delivery'
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

export default TypeOfDeliveryLineGraph;

