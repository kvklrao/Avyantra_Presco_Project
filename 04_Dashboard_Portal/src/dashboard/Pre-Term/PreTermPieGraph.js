import React, { Component } from "react";
import ReactApexChart from 'react-apexcharts';

const centered = {
    margin: '20%',
    marginTop: '5%'
    // marginLeft:'2%'
}

export default class PreTermPieGraph extends Component {

    constructor(props) {
        super(props);

        this.state = {
            series: [this.props.sum_preterm_no_count, this.props.sum_preterm_yes_count],
            options: {
                chart: {
                    width: 400,
                    type: 'pie',
                },
                colors: ['#8b4513', '#d2691e'],
                fill: {
                    colors: ['#8b4513', '#d2691e']
                },
                labels: ['Yes', 'No'],
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

