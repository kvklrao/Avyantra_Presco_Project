import React, { Component } from "react";
import ReactApexChart from 'react-apexcharts';
const centered = {
    // margin: '10%',
    // marginTop: '5%'
}

export default class GenderPieGraph extends Component {

    constructor(props) {
        super(props);

        this.state = {
            series: [this.props.sum_male_count, this.props.sum_female_count],
            options: {
                chart: {
                    type: 'pie',
                },
                colors: ['#5e66ed', '#f395e6'],
                fill: {
                    colors: ['#5e66ed', '#f395e6']
                },
                labels: ['Male', 'Female'],
                legend: {
                    position: 'top',
                  }
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
                width={'100%'} />
        );
    }
}

