import React, { Component } from "react";
import ReactApexChart from 'react-apexcharts';

const centered = {
    margin: '18%',
    marginLeft: '4%',
    marginTop: '5%'
}

class PreTermLineGraph extends Component {
    constructor(props) {

        super(props);
        this.state = {

            series: [{
                name: "Yes",
                data: this.props.preterm_yes_count
            },
            {
                name: "No",
                data: this.props.preterm_no_count
            }
            ],
            options: {
                chart: {
                    height: 350,
                    type: 'line',
                    zoom: {
                        enabled: false
                    }
                },
                dataLabels: {
                    enabled: false
                },
                colors: ['#8b4513', '#d2691e'],
                fill: {
                    colors: ['#8b4513', '#d2691e']
                },
                stroke: {
                    curve: 'straight'
                },
                title: {
                    text: '',
                    align: 'left'
                },
                grid: {
                    row: {
                        colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
                        opacity: 0.5
                    },
                },
                xaxis: {
                    categories: this.props.xaxis_dates,
                }

            }
        }
    }

    render() {

        return (
            // <Spin tip="Loading..." >
            <div>
                <center>
                    <ReactApexChart
                        options={this.state.options}
                        series={this.state.series}
                        type="line" width={440}
                        style={centered} />
                </center>
            </div>
            //    </Spin>
        );
    }
}

export default PreTermLineGraph;

