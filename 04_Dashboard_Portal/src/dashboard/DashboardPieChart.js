import React, { Component } from "react";
import ReactApexChart from 'react-apexcharts';

const centered = {
    // margin: '10%',
   // marginTop: '12%'
}

export default class DashboardPieChart extends Component {

    constructor(props) {
        super(props);

        this.state = {
            series: [this.props.sum_positive_sepsis_count, this.props.sum_negative_sepsis_count],
            options: {
                chart: {
                    type: 'pie',
                },
                labels: ['Positive', 'Negative'],
                legend: {
                    position: 'top',
                  },
                colors: ['#FFA500', '#32CD32'],
                fill: {
                    colors: ['#FFA500', '#32CD32']
                },
            },
        }
    }

    render() {

        return (
            <div>
                <ReactApexChart
                    options={this.state.options}
                    series={this.state.series}
                    type="pie"
                    style={centered} 
                    width={'100%'} />
            </div>
        );
    }
}

