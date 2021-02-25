import React, { Component } from 'react';
import { Row, Col, Card, Table, Avatar } from 'antd';

const dataSource = [
    {
        key: '1',
        risktype: 'Low Risk',
        scorerange: '0 - 5.0',
        color: <Avatar
            style={{
                backgroundColor: '#00b300',
            }}
        />,
    },
    {
        key: '2',
        risktype: 'Medium Risk',
        scorerange: '5.1 - 8.0',
        color: <Avatar
            style={{
                backgroundColor: '#FFA500',
            }}
        />,
    },
    {
        key: '3',
        risktype: 'High Risk',
        scorerange: '8.1 - 10.0',
        color: <Avatar
            style={{
                backgroundColor: '#ff5050',
            }}
        />,
    },
];

const columns = [
    {
        title: 'Risk Type',
        dataIndex: 'risktype',
        key: 'risktype',
    },
    {
        title: 'Score Range',
        dataIndex: 'scorerange',
        key: 'scorerange',
    },
    {
        title: 'Color',
        dataIndex: 'color',
        key: 'color',
    },
];

export default class ScoreForSingleReading extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let score_color = '#D3D3D3'
        if (this.props.score == '') {
            score_color = '#D3D3D3'
        } else if (this.props.score <= 5.0) {
            score_color = "#00b300"
        } else if (this.props.score <= 8.0) {
            score_color = "#FFA500"
        } else if (this.props.score <= 10.0) {
            score_color = "#ff5050"
        }
        return (
            <div>
                <Row justify='space-between'>
                    <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
                        <Card title={"Neonatal Sepsis Predictive Score: " + this.props.reading}>
                            <center><Avatar size={252} style={{ backgroundColor: score_color }}>
                                <h1 style={{ margin: 100, color: '#fff' }}>{this.props.score}</h1>
                            </Avatar></center>
                        </Card>
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
                        <Card title="Score Risk Range" >
                            <Table dataSource={dataSource} columns={columns} pagination={false} />
                        </Card>
                    </Col>
                </Row>
            </div>
        )
    }
}