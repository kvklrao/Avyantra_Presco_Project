import React, { Component } from "react";
import ReactApexChart from 'react-apexcharts';

const centered = {
    margin: '18%',
    marginLeft: '4%',
    marginTop: '2%'
}

let parameter_name = 'Sepsis',eos=false;
export default class FinalDiagnosisBarGraph extends Component {
    constructor(props) {
        super(props);
        this.state = {
            series: [{
                name: 'Final Diagnosis ' + parameter_name + ' positive',
                data: this.props.final_diagnosis_positive_count
            }, {
                name: 'Final Diagnosis ' + parameter_name + ' Negative',
                data: this.props.final_diagnosis_negative_count
            },
            {
                name: 'Preliminary Diagnosis ' + parameter_name + ' positive',
                data: this.props.preliminary_diagnosis_positive_count
            }, {
                name: 'Preliminary Diagnosis ' + parameter_name + ' negative',
                data: this.props.preliminary_diagnosis_negative_count
            }
            ],
            options: {
                chart: {
                    type: 'bar',
                },
                colors: ['#ff634d', '#663399',
                    '#d2b715', '#ffd732'],
                fill: {
                    colors: ['#ff634d', '#663399',
                        '#d2b715', '#ffd732'],
                },
                plotOptions: {
                    bar: {
                        horizontal: false,
                        columnWidth: '35%',
                        endingShape: 'rounded',
                        dataLabels: {
                            position: 'top', // top, center, bottom
                        },
                    },
                },
                dataLabels: {
                    enabled: true,
                    formatter: function (val) {
                        return val;
                    },
                    offsetY: -20,
                    style: {
                        fontSize: '12px',
                        colors: ["#304758"]
                    }
                },
                stroke: {
                    show: true,
                    width: 2,
                    colors: ['transparent']
                },
                xaxis: {
                    categories: this.props.xaxis_dates,
                },
                yaxis: {
                    // title: {
                    //     text: '$ (thousands)'
                    // }
                },
                // fill: {
                //     opacity: 1
                // },
                tooltip: {
                    y: {
                        formatter: function (val) {
                            return val
                        }
                    }
                }
            },
        }
    }
    componentDidMount() {
        eos= false;
        console.log(this.props)
        let param = "final_diagnosis_sepsis";
        if (this.props.parameter !== undefined) {
            param = this.props.parameter;
        }
        if (param.includes("sepsis")) {
            parameter_name = "Sepsis"
        } else if (param.includes("eos")) {
            parameter_name = "eos los"
            eos =true
        } else if (param.includes("gastroenteritis")) {
            parameter_name = "Gastroenteritis"
        } else if (param.includes("final_diagnosis_rds")) {
            parameter_name = "RDS"
        } else if (param.includes("final_diagnosis_ttnb")) {
            parameter_name = "TTNB"
        } else if (param.includes("final_diagnosis_jaundice")) {
            parameter_name = "Jaundice"
        } else if (param.includes("final_diagnosis_lbw")) {
            parameter_name = "LBW"
        } else if (param.includes("final_diagnosis_lga")) {
            parameter_name = "LGA"
        } else if (param.includes("final_diagnosis_aga")) {
            parameter_name = "AGA"
        } else if (param.includes("final_diagnosis_sga")) {
            parameter_name = "SGA"
        } else if (param.includes("final_diagnosis_anemia")) {
            parameter_name = "Anemia"
        } else if (param.includes("final_diagnosis_dextochordia")) {
            parameter_name = "Dextochordia"
        } else if (param.includes("final_diagnosis_hypoglycemia")) {
            parameter_name = "Hypoglycemia"
        } else if (param.includes("final_diagnosis_hypocalcemia")) {
            parameter_name = "Hypocalcemia"
        } else if (param.includes("final_diagnosis_perinatal_respiratory_depression")) {
            parameter_name = "Respiratory Depression"
        } else if (param.includes("final_diagnosis_shock")) {
            parameter_name = "Shock"
        } else if (param.includes("gastroefinal_diagnosis_feeding_intolerencenteritis")) {
            parameter_name = "Feeding Intolerence"
        }
        this.setState({
            series: [{
                name: 'Final Diagnosis ' + parameter_name + ' positive',
                data: this.props.final_diagnosis_positive_count
            }, {
                name: 'Final Diagnosis ' + parameter_name + ' Negative',
                data: this.props.final_diagnosis_negative_count
            },
            {
                name: 'Preliminary Diagnosis ' + parameter_name + ' positive',
                data: this.props.preliminary_diagnosis_positive_count
            }, {
                name: 'Preliminary Diagnosis ' + parameter_name + ' negative',
                data: this.props.preliminary_diagnosis_negative_count
            }
            ]
        })
        if(eos==true) {
            this.setState({
                series: [{
                    name: 'Final Diagnosis EOS',
                    data: this.props.final_diagnosis_positive_count
                }, {
                    name: 'Final Diagnosis LOS',
                    data: this.props.final_diagnosis_negative_count
                },
                {
                    name: 'Preliminary Diagnosis EOS',
                    data: this.props.preliminary_diagnosis_positive_count
                }, {
                    name: 'Preliminary Diagnosis LOS',
                    data: this.props.preliminary_diagnosis_negative_count
                }
                ]
            })
        }
    }

    render() {
        return (
            <div>
                <center>
                    <ReactApexChart
                        options={this.state.options}
                        series={this.state.series}
                        type="bar"
                        width={900}
                        height={300}
                        style={centered}
                    />
                </center>
            </div>
        );
    }
}


