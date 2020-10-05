import React, { Component } from "react";
import { browserHistory } from 'react-router';
import axios from 'axios';
import { Form, Input, Button, Checkbox, Row, Card, Spin } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import './login.css'
import { Navbar } from 'react-bootstrap';
import avyantra from '../images/avyantra.jpg'

const containerStyle = {
    width: '100vh',
    padding: 100,
    marginLeft: 400
}

const navbarStyles = {
    backgroundColor: 'white'
}

const formStyle = {
    margin: '20%',
    marginTop: '12%'
}

const fieldStyle = {
    height: '60%'
}

const cardStyle = {
    margin: '5%',
    width: '40%',
    marginLeft: '30%',
    backgroundColor: '#fff'
}

export default class LoginForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            token: '',
            loaded: false,
            errors: false,
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentDidMount() {
        browserHistory.push(`/`)
    }

    handleSubmit = values => {
        // e.preventDefault();
        console.log(values);
        console.log("Here in login")
        this.setState({ loaded: true })
       

        axios.post(
            'https://dev-api.presco.avyantra.com/login',
            {
                username: values.username,
                password: values.password,
            }

        ).then(response => {
            console.log("Success ========>", response);
            this.setState({ token: response.data.response.auth0.id_token, loaded: true })
            localStorage.setItem('token', this.state.token)
            localStorage.setItem('username', response.data.response.first_name)
            console.log(this.state.token);
            axios.get(
               process.env.REACT_APP_URL,
                { headers: { 'Authorization': 'Bearer ' + this.state.token } }
            ).then(response => {
                console.log("Success ========>", response);
                this.setState({ loaded: false })
                if (response.data.branch_access) {
                    console.log("authenticated");
                    browserHistory.push(`dashboard1`)
                } else if (response.data.hospital_access)
                    browserHistory.push(`dashboard`)
                else {
                    browserHistory.push(`/`)
                }
            })
                .catch(error => {
                    console.log("Error ========>", error);
                }
                )

        })
            .catch(error => {
                this.setState({ errors: true, loaded: false })
                console.log("Error ========>", error);
            }
            )

    }

    render() {
        return (
            <div style={{ height: '105vh', backgroundColor: '#296d98' }}>
                <Navbar style={navbarStyles}>
                    <img src={avyantra} width="30" height="30" />
                    <h3 style={{ color: '#296d98', marginLeft: '1%', marginTop: '0.5%' }}>Avyantra</h3>
                </Navbar>

                <Card style={cardStyle}>
                    <center><h2 style={{ color: '#296d98' }}>Login to Continue</h2></center>
                    <Form style={formStyle}
                        name="normal_login"
                        className="login-form"
                        initialValues={{ remember: true }}
                        onFinish={this.handleSubmit}
                    >
                        <Form.Item
                            name="username"
                            rules={[{ required: true, message: 'Please input your Username!' }]}
                        >
                            <Input style={fieldStyle} prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            rules={[{ required: true, message: 'Please input your Password!' }]}
                        >
                            <Input style={fieldStyle}
                                prefix={<LockOutlined className="site-form-item-icon" />}
                                type="password"
                                placeholder="Password"
                            />
                        </Form.Item>
                        <Form.Item>
                            <Form.Item name="remember" valuePropName="checked" noStyle>
                                <Checkbox style={{ color: 'black' }}>Remember me</Checkbox>
                            </Form.Item>

                            <a className="login-form-forgot" href="">
                                Forgot password
                            </a>
                        </Form.Item>
                        {this.state.errors ? <center><h6 style={{ color: 'red', fontSize: 15 }}>*Invalid Username or Password</h6></center> : null}
                        <Form.Item>
                            <Button type="primary" style={{ backgroundColor: '#296d98' }} htmlType="submit" className="login-form-button">
                                Log in
                                </Button>
                            {/* Or <a href="">register now!</a> */}
                        </Form.Item>
                        {this.state.loaded ? <center><Spin size="medium"></Spin></center> : null}
                    </Form>
                </Card>
            </div>
        );
    }
}