import React, { Component } from "react";
import Chart from "react-apexcharts";

export default class PreTermBabies extends Component {
    constructor(props) {
        super(props);

        this.state = {
            options: {
                chart: {
                    id: "basic-bar"
                },
                fill: {
                    colors: ['#8B4513']
                },
                xaxis: {
                    categories: ['No', 'Yes']
                }
            },
            series: [
                {
                    name: "series-1",
                    data: [110, 103]
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

