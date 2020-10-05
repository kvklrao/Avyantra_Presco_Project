import React, { Component, Fragment } from "react";
import { Layout, Menu, Avatar, Breadcrumb } from 'antd';
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    DatabaseOutlined,
    BarChartOutlined,SettingOutlined
} from '@ant-design/icons';
import { browserHistory, Link, Route, Router } from 'react-router';
import '../Main/mainstyle.css';
import avyantra from '../images/avyantra.jpg';
import HospitalDashboard from '../dashboard/HospitalView/hospitalDashboard'
import AllBabyDetails from "../dashboard/BabyDetails/AllBabyDetails";
import Dashboard from '../dashboard/dashboard';
import GenderDistributionGraph from "../dashboard/GenderDistribution/GenderDistributionGraph";
import PreTermGraph from "../dashboard/Pre-Term/PreTermGraph";
import TypeOfDeliveryGraph from "../dashboard/TypeOfDelivery/TypeOfDeliveryGraph";
import EosLosGraph from "../dashboard/EOS_LOSGraph/EosLosGraph";
import FinalDiagnosisGraph from '../dashboard/FinalDiagnosis/FinalDiagnosisGraph'
import Settings from "./settings";



const { Header, Sider, Content, Footer } = Layout;
const { SubMenu } = Menu

const navbarStyles = {
    width: '100%',
    backgroundColour: '#DCDCDC'
}

export default class MainComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            collapsed: false,
            visible: false, placement: 'right',
        };
    }

    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };

    logout = () => {
        localStorage.setItem('token', null);
        browserHistory.push('/')
    };


    render() {
        console.log(this.state.a1);
        const { placement, visible } = this.state;
        return (
            <Layout>
                <Layout>
                    <Sider trigger={null} collapsible collapsed={this.state.collapsed} style={{ backgroundColor: '#fff' }}>
                        <div className="logo" />
                        {this.state.collapsed ? <center><img src={avyantra} width="50" height="50" /></center> :
                            <center><h2 style={{ color: '#296d98', margin: '6%' }}>Avyantra</h2></center>}
                        <Menu style={{ backgroundColor: '#296d98' }} mode="inline"
                            defaultSelectedKeys={['/dashboard']} style={{ marginTop: 60 }}
                            selectedKeys={[this.props.location.pathname]}
                            defaultOpenKeys={['sub1']}
                        >
                            <Menu.Item key="/dashboard" icon={<DatabaseOutlined />} >
                                <Link to={`/dashboard`}> Dashboard</Link>
                            </Menu.Item>
                            <SubMenu key="sub1" icon={<BarChartOutlined />} title="Reports"
                                selectedKeys={[this.props.location.pathname]} >
                                <Menu.Item key="/sepsis"><Link to={`sepsis`}>Sepsis Status</Link></Menu.Item>
                                <Menu.Item key="/baby_details"><Link to={`baby_details`}>Baby Health Record Reading Analysis</Link></Menu.Item>
                                <Menu.Item key="/gender_check"><Link to={`gender_check`}>Gender Distribution Check</Link></Menu.Item>
                                <Menu.Item key="/pre_term_check"><Link to={`pre_term_check`}>Pre-Term Check</Link></Menu.Item>
                                <Menu.Item key="/type_of_delivery"><Link to={`type_of_delivery`}>Type Of Delivery Check</Link></Menu.Item>
                                <Menu.Item key="/eos_los"><Link to={`eos_los`}>EOS LOS</Link></Menu.Item>
                                <Menu.Item key="/final_diagnosis"><Link to={`final_diagnosis`}>Final Diagnosis</Link></Menu.Item>
                            </SubMenu>
                        </Menu>
                    </Sider>

                    <Layout className="site-layout">
                        <Header style={{ padding: 0, backgroundColor: '#fff' }}>
                            {React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                                className: 'trigger',
                                onClick: this.toggle,
                            })}

                            <Menu key="setting" mode="horizontal" style={{ marginTop: -65, marginLeft: '145vh' }} >
                                <Menu.Item key="settings" > <Link to={`settings`}>
                                    <SettingOutlined style={{ fontSize: '16px', color: '#08c' }}/></Link> </Menu.Item>
                            </Menu>

                            <Menu key="user" mode="horizontal" onClick={this.handleClickMenu} style={{ marginTop: -65, marginLeft: '150vh' }}>
                                <SubMenu
                                    title={
                                        <Fragment>
                                            <span>Hi, {localStorage.getItem('username').charAt(0).toUpperCase() + localStorage.getItem('username').slice(1)}</span>
                                            <Avatar style={{ marginLeft: 8 }} src={avyantra} />
                                        </Fragment>
                                    }
                                >

                                    <Menu.Item key="SignOut" onClick={this.logout}>
                                        <h6>Sign out</h6>
                                    </Menu.Item>
                                </SubMenu>

                            </Menu>

                        </Header>

                        <Content
                            className="site-layout-background"
                            style={{
                                margin: '35px 25px',
                                padding: 24,
                                minHeight: '80vh',
                            }}
                        >

                            <Router history={browserHistory}>
                                <Route exact path="/dashboard" component={Dashboard} />
                                <Route exact path="/sepsis" component={HospitalDashboard}></Route>
                                <Route path="/baby_details" component={AllBabyDetails} />
                                <Route path="/gender_check" component={GenderDistributionGraph} />
                                <Route path="/pre_term_check" component={PreTermGraph} />
                                <Route path="/type_of_delivery" component={TypeOfDeliveryGraph} />
                                <Route path="/eos_los" component={EosLosGraph} />
                                <Route exact path="/settings" component={Settings} />
                                <Route path="/final_diagnosis" component={FinalDiagnosisGraph} />
                            </Router>

                        </Content>
                        <Footer style={{ textAlign: 'center', backgroundColor: '#fff' }}>Avyantra Dashboard ©2020</Footer>
                    </Layout>
                </Layout>
            </Layout >
        );
    }
}