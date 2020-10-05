import React, { Component } from "react";
import axios from 'axios';
import { Container } from 'react-bootstrap';
import { Input } from "antd";
import { Table } from 'react-bootstrap';
import Users from './users';
const { Search } = Input;


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
            <Container style={{ margin_top: '10' }}>

                <Search
                    placeholder="search for users"
                    onChange={(value) => this.editSearchTerm(value)}
                    style={{ width: '80%',marginBottom: '20px' }}
                    enterButton
                />
           

                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>userid</th>
                            <th>user name</th>
                            <th>hospital access</th>
                            <th>branch access</th>
                        </tr>
                    </thead>
                    <tbody>

                        <Users users={this.dynamicSearch()} />

                    </tbody>
                </Table>


            </Container>
        );
    }
}

