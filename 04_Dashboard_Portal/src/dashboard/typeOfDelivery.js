import React, { Component } from "react";
import Chart from "react-apexcharts";

export default class TypeOfDelivery extends Component {

    constructor(props) {
        super(props);

        this.state = {
            ChartOptions: {
                labels: ['Cesarian', 'Normal'],
                fill: {
                    colors: ['#F5DEB3', '#DAA520']
                },
                colors: ['#F5DEB3', '#DAA520']
            },
            series: [122, 88],
            options: {
                dataLabels: {
                    enabled: true,
                    enabledOnSeries: [0],
                    
                }
            }
        }
    }

    render() {

        return (
            <div className="donut">
                <Chart options={this.state.ChartOptions} series={this.state.series} type="pie" width="320"  />
            </div>
        );
    }
}

