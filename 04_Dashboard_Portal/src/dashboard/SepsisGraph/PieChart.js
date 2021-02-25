import React, { Component } from "react";
import ReactApexChart from 'react-apexcharts';

const centered = {
  //  margin: '5%',
    //marginTop: '5%',
}

export default class PieChart extends Component {

    constructor(props) {
        super(props);

        this.state = {
            series: [this.props.sum_positive_sepsis_count, this.props.sum_negative_sepsis_count],
            options: {
                chart: {
                    type: 'pie',
                }, plotOptions: {
                    pie: {
                        size: 650

                    }
                },
                colors: ['#FFA500', '#32CD32'],
                fill: {
                    colors: ['#FFA500', '#32CD32']
                },
                labels: ['Sepsis Positive', 'Sepsis Negative'],
                legend: {
                    position: 'top',
                  }
            },
         
        }
    }

    render() {

        return (
            <ReactApexChart
                options={this.state.options}
                series={this.state.series}
                type="pie"
                style={centered}
                width={'100%'} />
        );
    }
}

