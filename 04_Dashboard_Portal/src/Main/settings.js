import React, { Component } from "react";
import { Layout, Row, Col } from 'antd';
import axios from 'axios';
import { Container } from 'react-bootstrap';
import { Input } from "antd";
import { Table } from 'react-bootstrap';
import Users from './users';
const { Search } = Input;
const { Content } = Layout;



export default class Settings extends Component {

    constructor(props) {
        super(props);
        this.state = {
            users: [],
            hospital_name: '',
            searchTerm: ''
        }
        this.editSearchTerm = this.editSearchTerm.bind(this);
        this.dynamicSearch = this.dynamicSearch.bind(this);
    }

    async componentDidMount() {
        await axios.get(
            process.env.REACT_APP_URL + '/admin',
            { headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') } }
        ).then(
            res => {
                this.setState({
                    users: res.data.results,
                    hospital_name: res.data.hospitalName[0].hospital_name

                })
            }
        );

    }

    editSearchTerm = (e) => {
        this.setState({ searchTerm: e.target.value })
    }

    dynamicSearch = () => {
        return this.state.users.filter(user => user.username.toLowerCase().includes(this.state.searchTerm.toLowerCase()))
    }


    render() {
        var i = 0;

        return (
            <Content className="site-layout-background"
                style={{
                    margin: '27px 17px',
                    padding: 5,
                    minHeight: '80vh',
                }}>
                <Container style={{ margin_top: '10' }}>

                    <Search
                        placeholder="search for users"
                        onChange={(value) => this.editSearchTerm(value)}
                        style={{ width: '80%', marginBottom: '20px' }}
                        enterButton
                    />

                    <Row>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th xs={4} sm={4} md={4} lg={4} xl={4} xxl={4}
                                        >userid</th>
                                        <th xs={4} sm={4} md={4} lg={4} xl={4} xxl={4}>user name</th>
                                        <th xs={4} sm={4} md={4} lg={4} xl={4} xxl={4}>hospital access</th>
                                        <th xs={4} sm={4} md={4} lg={4} xl={4} xxl={4}>branch access</th>
                                    </tr>
                                </thead>
                                <tbody>

                                    <Users users={this.dynamicSearch()} />

                                </tbody>
                            </Table>
                        </Col>
                    </Row>
                </Container>
            </Content>
        );
    }
}

