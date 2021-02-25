import React, { Component, Fragment } from 'react';
import { Layout, Menu, Avatar, Select, Row, Col } from 'antd';
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    DatabaseOutlined,
    BarChartOutlined, SettingOutlined, WindowsFilled
} from '@ant-design/icons';
import { browserHistory, Link, Route, Router } from 'react-router';
import avyantra from '../images/avyantra.jpg';

const { SubMenu } = Menu
const { Option } = Select;

class RightMenu extends Component {
    render() {
        return (
            <Menu mode="horizontal">
                {localStorage.getItem('primary_user') == 1 ?
                    <Menu.Item key="settings"> <Link to={`settings`}>
                        <SettingOutlined style={{ fontSize: '22px', color: '#08c' }} /></Link>
                    </Menu.Item> : null}
                <SubMenu
                    title={
                        <Fragment>
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
        );
    }
}
export default RightMenu;