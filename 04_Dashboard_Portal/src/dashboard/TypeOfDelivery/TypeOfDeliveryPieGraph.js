import React, { Component } from "react";
import ReactApexChart from 'react-apexcharts';

const centered = {
    // margin: '10%',
    // marginTop: '5%'
}

export default class TypeOfDeliveryPieGraph extends Component {

    constructor(props) {
        super(props);

        this.state = {
            series: [this.props.sum_cesarean_delivery_count, this.props.sum_normal_delivery_count],
            options: {
                chart: {
                    type: 'pie',
                },
                colors: ['#879ceb', '#eba487'],
                fill: {
                    colors: ['#879ceb', '#eba487']
                },
                labels: ['Normal', 'Cesarean'],
                legend: {
                    position: 'top',
                  },
            },
        }
    }

    render() {

        return (
            <ReactApexChart
                options={this.state.options}
                series={this.state.series}
                type="pie"
                style={centered} 
                width={'100%'}/>
        );
    }
}

