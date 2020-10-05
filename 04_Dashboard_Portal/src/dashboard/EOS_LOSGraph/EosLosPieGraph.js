import React, { Component } from "react";
import ReactApexChart from 'react-apexcharts';

const centered = {
    margin: '20%',
    marginTop: '5%'
    // marginLeft:'2%'
}

export default class EosLosPieGraph extends Component {

    constructor(props) {
        super(props);

        this.state = {
            series: [this.props.sum_eos_count, this.props.sum_los_count],
            options: {
                chart: {
                    width: 400,
                    type: 'pie',
                },
                colors: ['#00ffff', '#58D68D'],
                fill: {
                    colors: ['#00ffff', '#58D68D']
                },
                labels: ['LOS', 'EOS'],
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

