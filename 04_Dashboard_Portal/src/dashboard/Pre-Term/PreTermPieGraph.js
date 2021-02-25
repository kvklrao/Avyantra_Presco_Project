import React, { Component } from "react";
import ReactApexChart from 'react-apexcharts';

const centered = {
    // margin: '10%',
    // marginTop: '5%'
}

export default class PreTermPieGraph extends Component {

    constructor(props) {
        super(props);

        this.state = {
            series: [this.props.sum_preterm_no_count, this.props.sum_preterm_yes_count],
            options: {
                chart: {
                    type: 'pie',
                },
                colors: ['#FFA500', '#32CD32'],
                fill: {
                    colors: ['#FFA500', '#32CD32']
                },
                labels: ['Pre-Term Yes', 'Pre-Term No'],
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

