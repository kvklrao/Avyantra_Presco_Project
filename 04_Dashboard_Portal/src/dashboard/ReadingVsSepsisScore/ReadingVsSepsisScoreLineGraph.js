import React, { Component } from "react";
import ReactApexChart from 'react-apexcharts';

const centered = {
    margin:'15%',
    marginTop: '2%'
}

class ReadingVsSepsisScoreLineGraph extends Component {
    constructor(props) {

        super(props);
        this.state = {

            series: [{
                name: "Yes",
                data: this.props.sepsis_score
            },
            ],
            options: {
                chart: {
                    type: 'line',
                    toolbar: {
                        show: false,
                    },
                    zoom: {
                        enabled: false
                    }
                },
                dataLabels: {
                    enabled: false
                },
                colors: ['#483D8B'],
                legend: {
                    position: 'top',
                  },
                fill: {
                    colors: ['#483D8B']
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
                    categories: this.props.readings,
                    title: {
                        text: 'Readings'
                    }
                },
                yaxis: {
                    title: {
                        text: 'Sepsis Score'
                    }
                }

            },
        }
    }

    render() {

        return (
            <ReactApexChart
                options={this.state.options}
                series={this.state.series}
                type="line"
                height={300}
                style={centered} />
        );
    }
}

export default ReadingVsSepsisScoreLineGraph;

