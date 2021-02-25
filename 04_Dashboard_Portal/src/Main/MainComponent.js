import React, { Component, Fragment } from "react";
import { Layout, Menu, Avatar, Select, } from 'antd';
import {
    DatabaseOutlined,
    BarChartOutlined, SettingOutlined, 
} from '@ant-design/icons';
import { browserHistory, Link, Route, Router } from 'react-router';
import '../Main/mainstyle.css';
import axios from 'axios';
import { isMobile } from 'react-device-detect';
///import ResponsiveAntMenu from 'responsive-ant-menu'
import avyantra from '../images/avyantra.jpg';
import HospitalDashboard from '../dashboard/SepsisGraph/hospitalDashboard'
import AllBabyDetails from "../dashboard/BabyDetails/AllBabyDetails";
import Dashboard from '../dashboard/Dashboard';
import GenderDistributionGraph from "../dashboard/GenderDistribution/GenderDistributionGraph";
import PreTermGraph from "../dashboard/Pre-Term/PreTermGraph";
import TypeOfDeliveryGraph from "../dashboard/TypeOfDelivery/TypeOfDeliveryGraph";
import EosLosGraph from "../dashboard/EOS_LOSGraph/EosLosGraph";
import FinalDiagnosisGraph from '../dashboard/FinalDiagnosis/FinalDiagnosisGraph'
import Settings from "./settings";
import ReadingVsSepsisScoreGraph from '../dashboard/ReadingVsSepsisScore/ReadingVsSepsisScoreGraph';
import CRPVsBloodCultureGraph from '../dashboard/CRPVsBloodCultureVsPredictiveAnalysis/CRPVsBloodCultureGraph';

const { Header, Sider, Content, Footer } = Layout;
const { SubMenu } = Menu
const { Option } = Select;

export default class MainComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            collapsed: false,
            visible: false, placement: 'right',
            isLoading: false,
            hospital: [],
            branch: [],
            apply_clicked: false,
            hospital_id: '',
            branch_id: '',
        };
        this.handleChangeBranch = this.handleChangeBranch.bind(this);
        this.handleChangeHospital = this.handleChangeHospital.bind(this);
        this.changeBranchOnHospital = this.changeBranchOnHospital.bind(this);
    }

    async componentDidMount() {
        await axios.get(
            process.env.REACT_APP_URL + '/hospitalsForUser',
            { headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') } }
        ).then(response => {
            // console.log("Success ========>", response);
            this.setState({ isLoading: true, hospital: response.data.results })
        })
            .catch(error => {
                console.log("Error ========>", error);
            }
            )
        await axios.get(
            process.env.REACT_APP_URL + '/branchesForUser',
            { headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') } }
        ).then(response => {
            // console.log("Success ========>", response);
            this.setState({ isLoading: true, branch: response.data.results, })
        })
            .catch(error => {
                console.log("Error ========>", error);
            }
            )

        if (localStorage.getItem('super_user') == 1) {
            localStorage.setItem('all_hospitals', 1)
            localStorage.setItem('all_branches', 1)

        } else if (localStorage.getItem('hospital_access') == 1) {
            localStorage.setItem('all_hospitals', 0)
            localStorage.setItem('all_branches', 1)

        } else {
            localStorage.setItem('all_hospitals', 0)
            localStorage.setItem('all_branches', 0)
        }
    }

    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };

    onCollapse = collapsed => {
        this.setState({ collapsed });
    };

    // onCollapseMobile = collapsed => {
    //     if (isMobile) {
    //         this.setState({ collapsed });
    //     }
    // };


    logout = () => {
        localStorage.setItem('token', null);
        localStorage.setItem('super_user', null);
        localStorage.setItem('primary_user', null);
        localStorage.setItem('hospital_access', null);
        localStorage.setItem('branch_access', null);
        localStorage.setItem('username', null);
        browserHistory.push('/')
    };

    async handleChangeHospital(value) {
        await this.setState({ hospital_id: value });
        this.changeBranchOnHospital();
    }

    async changeBranchOnHospital() {
        await axios.get(
            process.env.REACT_APP_URL + '/branchesForUser?hospital_id=' + this.state.hospital_id,
            { headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') } }
        ).then(response => {
            // console.log("Success ========>", response);
            this.setState({ isLoading: true, branch: response.data.results })
        })
            .catch(error => {
                console.log("Error ========>", error);
            }
            )

    }

    async handleChangeBranch(value) {
        await this.setState({ branch_id: value, apply_clicked: !this.state.apply_clicked, all_branches: 0 });
    }


    render() {
        const { placement, visible } = this.state;
        let hospital_view = "Hospital";
        let branch_view = "Branch";

        // if (localStorage.getItem('super_user') == 1) {
        //     hospital_view = "Hospital (All)";
        //     branch_view = "Branch (All)";
        // } else if (localStorage.getItem('hospital_access') == 1) {
        //     hospital_view = this.state.isLoading?(this.state.hospital[0].hospital_name):"Hospital";
        //     branch_view = "Branch (All)";
        // } else {
        //     hospital_view = this.state.isLoading?(this.state.hospital[0].hospital_name):"Hospital";
        //     branch_view = this.state.isloading?(this.state.branch[0].branch_name):"Branch";
        // }

        return (
            <Layout>
                <Layout>
                    <Sider
                        // breakpoint="xs"
                        // collapsedWidth="0"
                        // onBreakpoint={broken => {
                        //     this.setState({collapsed:true})
                        //   }}
                        // trigger={null} collapsible collapsed={this.state.collapsed}
                        collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}
                        breakpoint="lg"
                        collapsedWidth="0"
                        style={{ backgroundColor: '#fff' }}
                    >
                        <div />
                        {this.state.collapsed ? <center><img src={avyantra} width="50" height="50" /></center> :
                            <center><h2 style={{ color: '#296d98', margin: '6%' }}>Avyantra</h2></center>}
                        <Menu
                            style={{ backgroundColor: '#296d98' }}
                            mode="inline"
                            defaultSelectedKeys={['/dashboard']} style={{ marginTop: 60 }}
                            selectedKeys={[this.props.location.pathname]}
                            defaultOpenKeys={['sub1']}
                        >
                            <Menu.Item key="/dashboard" icon={<DatabaseOutlined />} >
                                <Link to={`/dashboard`}> Dashboard</Link>
                            </Menu.Item>
                            <SubMenu key="sub1" icon={<BarChartOutlined />} title="Reports"
                                selectedKeys={[this.props.location.pathname]}
                                onClick={this.onCollapse} >
                                <Menu.Item key="/sepsis"><Link to={`sepsis`}>Sepsis Status</Link></Menu.Item>
                                <Menu.Item key="/reading_sepsis_score"><Link to={`reading_sepsis_score`}>Reading Vs Sepsis Score</Link></Menu.Item>
                                <Menu.Item key="/baby_details"><Link to={`baby_details`}>Baby Health Record Reading Analysis</Link></Menu.Item>
                                <Menu.Item key="/gender_check"><Link to={`gender_check`}>Gender Distribution Check</Link></Menu.Item>
                                <Menu.Item key="/pre_term_check"><Link to={`pre_term_check`}>Pre-Term Check</Link></Menu.Item>
                                <Menu.Item key="/type_of_delivery"><Link to={`type_of_delivery`}>Type Of Delivery Check</Link></Menu.Item>
                                <Menu.Item key="/eos_los"><Link to={`eos_los`}>EOS Vs LOS</Link></Menu.Item>
                                <Menu.Item key="/final_diagnosis"><Link to={`final_diagnosis`}>Final Diagnosis</Link></Menu.Item>
                                <Menu.Item key="/crp_blood_culture"><Link to={`crp_blood_culture`}>CRP Vs Blood Culture</Link></Menu.Item>
                            </SubMenu>
                        </Menu>
                    </Sider>

                    <Layout className="site-layout">
                        <Header
                            style={{
                                backgroundColor: '#fff', width: '100%'
                            }}
                        >
                            {/* {React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                                className: 'trigger',
                                onClick: this.toggle,
                            })} */}

                            <Menu key="hospital" mode="horizontal"
                                //onClick={this.handleClickMenu}
                                breakpoint="lg"
                                collapsedWidth="0"
                                style={{ display: 'flex', justifyContent: 'flex-end' }}
                            >


                                <Menu.Item key="hospital"
                                >
                                    {this.state.isLoading ?
                                        <Select defaultValue={hospital_view} style={{ width: '100%' }}
                                            onChange={this.handleChangeHospital} allowClear>
                                            {
                                                this.state.hospital.map(index => {
                                                    return (
                                                        <Option value={index.hospital_id} >
                                                            {index.hospital_name}
                                                        </Option>
                                                    )
                                                })
                                            }
                                        </Select> :
                                        <Select defaultValue={hospital_view} style={{ width: '100%' }} disabled
                                            onChange={this.handleChangeHospital} allowClear>
                                            {
                                                this.state.hospital.map(index => {
                                                    return (
                                                        <Option value={index.hospital_id} >
                                                            {index.hospital_name}
                                                        </Option>
                                                    )
                                                })
                                            }
                                        </Select>}
                                </Menu.Item>
                                <Menu.Item key="branch" >
                                    {this.state.isLoading ?
                                        <Select defaultValue={branch_view} style={{ width: '100%' }}
                                            onChange={this.handleChangeBranch} allowClear>
                                            {
                                                this.state.branch.map(index => {
                                                    return (
                                                        <Option value={index.hospital_branch_id} >
                                                            {index.branch_name}
                                                        </Option>
                                                    )
                                                })
                                            }
                                        </Select> :
                                        <Select defaultValue={branch_view} style={{ width: '100%' }} disabled
                                            onChange={this.handleChangeBranch} allowClear>
                                            {
                                                this.state.branch.map(index => {
                                                    return (
                                                        <Option value={index.hospital_branch_id} >
                                                            {index.branch_name}
                                                        </Option>
                                                    )
                                                })
                                            }
                                        </Select>}
                                </Menu.Item>
                                {localStorage.getItem('primary_user') == 1 ?
                                    <Menu.Item key="settings"> <Link to={`settings`}>
                                        <SettingOutlined style={{ fontSize: '22px', color: '#08c' }} /></Link>
                                    </Menu.Item> : null}

                                <SubMenu

                                    title={
                                        <Fragment >
                                            <span>Hi, {localStorage.getItem('username').charAt(0).toUpperCase() + localStorage.getItem('username').slice(1)}</span>
                                            <Avatar style={{ marginLeft: 20 }} src={avyantra} />
                                        </Fragment>
                                    }
                                >

                                    <Menu.Item key="SignOut" onClick={this.logout}>
                                        <h6>Sign out</h6>
                                    </Menu.Item>
                                </SubMenu>

                            </Menu>

                        </Header>


                        {/* <Content
                            className="site-layout-background"
                            style={{
                                margin: '35px 25px',
                                padding: 24,
                                minHeight: '80vh',
                            }}
                        > */}

                        <Router history={browserHistory}>
                            <Route exact path="/dashboard" component={() => (<Dashboard
                                apply_clicked={this.state.apply_clicked}
                                hospital_id={this.state.hospital_id}
                                branch_id={this.state.branch_id}
                            />)} />
                            <Route exact path="/sepsis" component={() => (<HospitalDashboard
                                apply_clicked={this.state.apply_clicked}
                                hospital_id={this.state.hospital_id}
                                branch_id={this.state.branch_id}
                            />)} />
                            <Route path="/baby_details" component={() => (<AllBabyDetails
                                apply_clicked={this.state.apply_clicked}
                                hospital_id={this.state.hospital_id}
                                branch_id={this.state.branch_id}
                            />)} />
                            <Route path="/gender_check" component={() => (<GenderDistributionGraph
                                apply_clicked={this.state.apply_clicked}
                                hospital_id={this.state.hospital_id}
                                branch_id={this.state.branch_id}
                            />)} />
                            <Route path="/pre_term_check" component={() => (<PreTermGraph
                                apply_clicked={this.state.apply_clicked}
                                hospital_id={this.state.hospital_id}
                                branch_id={this.state.branch_id}
                            />)} />
                            <Route path="/type_of_delivery" component={() => (<TypeOfDeliveryGraph
                                apply_clicked={this.state.apply_clicked}
                                hospital_id={this.state.hospital_id}
                                branch_id={this.state.branch_id}
                            />)} />
                            <Route path="/eos_los" component={() => (<EosLosGraph
                                apply_clicked={this.state.apply_clicked}
                                hospital_id={this.state.hospital_id}
                                branch_id={this.state.branch_id}
                            />)} />
                            <Route exact path="/settings" component={Settings} />
                            <Route path="/final_diagnosis" component={() => (<FinalDiagnosisGraph
                                apply_clicked={this.state.apply_clicked}
                                hospital_id={this.state.hospital_id}
                                branch_id={this.state.branch_id}
                            />)} />
                            <Route path="/reading_sepsis_score" component={() => (<ReadingVsSepsisScoreGraph
                                apply_clicked={this.state.apply_clicked}
                                hospital_id={this.state.hospital_id}
                                branch_id={this.state.branch_id}
                            />)} />
                            <Route path="/crp_blood_culture" component={() => (<CRPVsBloodCultureGraph
                                apply_clicked={this.state.apply_clicked}
                                hospital_id={this.state.hospital_id}
                                branch_id={this.state.branch_id}
                            />)} />
                        </Router>

                        {/* </Content> */}
                        <Footer style={{ textAlign: 'center', backgroundColor: '#fff' }}>Avyantra Dashboard ©2020</Footer>
                    </Layout>
                </Layout>
            </Layout >
        );
    }
}