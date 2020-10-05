import React, { Component, useState } from "react";
import Chart from "react-apexcharts";

export default class GenderDistribution extends Component {
    
  

    constructor(props) {
        super(props);

        this.state = {
            ChartOptions: {
                labels: ['Male', 'Female']
            },
            seriesone: [20,10],
            series: [270, 179],
            options: {
                dataLabels: {
                    enabled: true,
                    enabledOnSeries: [0]
                }
            }
        }
    }

    render() {
        console.log(this.props.value)
        return (
            <div className="donut">
                <Chart options={this.state.ChartOptions} series={this.state.series} type="pie" width="320"  />
            </div>
        );
    }
}

