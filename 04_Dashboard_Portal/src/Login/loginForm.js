import React, { Component } from "react";
import { browserHistory } from 'react-router';
import axios from 'axios';
import { Form, Input, Button, Checkbox, Card, Spin, Row, Col } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import './login.css'
import doctor_login from '../images/doctor_login.jpg';
import avyantra_logo1 from '../images/avyantra_logo1.jpg'


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
        this.setState({ loaded: true })
        localStorage.setItem('loginname',values.username)

        axios.post(
            process.env.REACT_APP_LOGIN_URL,
            {
                username: values.username,
                password: values.password,
            }

        ).then(response => {

            this.setState({ token: response.data.response.auth0.id_token, loaded: true })
            localStorage.setItem('token', this.state.token)
            localStorage.setItem('username', response.data.response.first_name)
            if (response.data.response.first_name == null || response.data.response.first_name == undefined) {
                localStorage.setItem('username', response.data.response.username)
            }
            
            axios.get(
                process.env.REACT_APP_URL,
                { headers: { 'Authorization': 'Bearer ' + this.state.token } }
            ).then(response => {
                this.setState({ loaded: false })
                response.data.is_super_user ?
                    localStorage.setItem('super_user', 1)
                    : localStorage.setItem('super_user', 0)

                response.data.hospital_access ?
                    localStorage.setItem('hospital_access', 1)
                    : localStorage.setItem('hospital_access', 0)

                response.data.branch_access ?
                    localStorage.setItem('branch_access', 1)
                    : localStorage.setItem('branch_access', 0)

                response.data.is_primary_user ?
                    localStorage.setItem('primary_user', 1)
                    : localStorage.setItem('primary_user', 0)

                if (response) {
                    browserHistory.push(`dashboard`)
                }
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
            <div style={{ height: '100vh' }}>
                {/* <Navbar >
                    <img src={avyantra_logo1} width="30" height="30" />
                    <h3 style={{ color: '#296d98', marginLeft: '1%', marginTop: '0.5%' }}>Avyantra</h3>
                </Navbar> */}
                <Row>
                    <Col
                        xs={0} sm={10} md={12}
                        lg={16} xl={16} xxl={16}
                    >

                        <img src={doctor_login} style={sectionStyle} />

                        {/* <h5 style={textStyle}>PRESCO – NEONATAL SEPSIS PREDICTION PLATFORM &nbsp; DASHBOARDS &amp; REPORTS </h5> */}


                    </Col>
                    <Col
                        xs={24} sm={14} md={12}
                        lg={8} xl={8} xxl={8}
                    ><Card style={cardStyle}>
                            <center><img src={avyantra_logo1} style={{ height: 50, width: 180, marginTop: 80 }} /></center>
                            <div style={divStyle}>

                                {/* <Row>
                                     <Col
                                        xs={24} sm={0} md={0}
                                        lg={0} xl={0} xxl={0}
                                    >
                                        <center><h5 style={{color: '#8fbc8f'}}>
                                            PRESCO – NEONATAL SEPSIS PREDICTION PLATFORM &nbsp; DASHBOARDS &amp; REPORTS </h5>
                                        </center>

                                    </Col> 
                                </Row> */}
                                <center>
                                    <h2 
                                    style={{ color: '#f26122' , 
                                    fontFamily: 'Yeseva One cursive',
                                    fontSize:'35px',
                                    fontWeight:'400'
                                    }}>
                                    PreSco Analytics Platform</h2></center>

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
                                        <Button type="primary" style={{ backgroundColor: '#007bff' }} htmlType="submit" className="login-form-button">
                                            Login
                                </Button>
                                        <a href="https://presco.avyantra.com/">Click to go to Presco!</a>
                                    </Form.Item>
                                    {this.state.loaded ? <center><Spin size="medium"></Spin></center> : null}
                                </Form>
                            </div>
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    }
}


const formStyle = {
    margin: '20%',
    marginTop: '12%'
}

const fieldStyle = {
    height: '70%',
}

const cardStyle = {
    height: '100vh',
    backgroundColor: '#fff'
}
var sectionStyle = {
    width: "100%",
    height: "100%",
};

var textStyle = {
    position: 'absolute',
    color: '#fff',
    top: '30%',
    left: '40%',
    fontFamily: 'sans-serif',
    fontWeight: 'bold'
};

var divStyle = {
    borderRadius: '5px',
    padding: '10px',
    marginTop: '10px'

}

