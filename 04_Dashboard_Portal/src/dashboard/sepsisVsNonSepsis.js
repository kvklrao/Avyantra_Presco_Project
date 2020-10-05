import React, { Component } from "react";
import Chart from "react-apexcharts";

export default class SepsisVsNonSepsis extends Component {
    constructor(props) {
        super(props);

        this.state = {
            options: {
                chart: {
                    id: "basic-bar"
                },
                fill: {
                    colors: ['#00BFFF']
                },
                xaxis: {
                    categories: ['Negative', 'Positive']
                }
            },
            series: [
                {
                    name: "series-1",
                    data: [175, 41]
                }
            ]
        };
    }

    render() {
        return (
            <div className="app">

                <div className="row">

                    <div className="mixed-chart">

                        <Chart
                            options={this.state.options}
                            series={this.state.series}
                            type="bar"
                            width="300"
                            // height= "228"
                        />
                    </div>
                </div>
            </div>
        );
    }
}

