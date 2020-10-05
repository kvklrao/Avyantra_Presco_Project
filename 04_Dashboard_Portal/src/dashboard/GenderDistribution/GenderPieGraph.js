import React, { Component } from "react";
import ReactApexChart from 'react-apexcharts';

const centered = {
    margin: '20%',
    marginTop: '5%'
    // marginLeft:'2%'
}

export default class GenderPieGraph extends Component {

    constructor(props) {
        super(props);

        this.state = {
            series: [this.props.sum_male_count, this.props.sum_female_count],
            options: {
                chart: {
                    width: 400,
                    type: 'pie',
                },
                colors: ['#5e66ed', '#f395e6'],
                fill: {
                    colors: ['#5e66ed', '#f395e6']
                },
                labels: ['Male', 'Female'],
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

