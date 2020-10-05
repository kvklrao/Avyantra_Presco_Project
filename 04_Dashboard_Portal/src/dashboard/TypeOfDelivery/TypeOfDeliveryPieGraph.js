import React, { Component } from "react";
import ReactApexChart from 'react-apexcharts';

const centered = {
    margin: '20%',
    marginTop: '5%'
    // marginLeft:'2%'
}

export default class TypeOfDeliveryPieGraph extends Component {

    constructor(props) {
        super(props);

        this.state = {
            series: [this.props.sum_cesarean_delivery_count, this.props.sum_normal_delivery_count],
            options: {
                chart: {
                    width: 400,
                    type: 'pie',
                },
                colors: ['#879ceb', '#eba487'],
                fill: {
                    colors: ['#879ceb', '#eba487']
                },
                labels: ['Normal', 'Cesarean'],
                responsive: [{
                    breakpoint: 480,
                    options: {
                        chart: {
                            width: 400
                        },
                        legend: {
                            position: 'bottom'
                        },
                    }
                }]
            },
        }
    }

    render() {

        return (
            <div>
                <ReactApexChart
                    options={this.state.options}
                    series={this.state.series}
                    type="pie" width={350}
                    style={centered} />
            </div>
        );
    }
}

