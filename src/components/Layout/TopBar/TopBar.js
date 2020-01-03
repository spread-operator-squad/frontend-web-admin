import React from "react";
import {Menu, Dropdown, Avatar, Icon, Layout, Row, Col} from "antd";
import {withRouter} from "react-router";

const {Header} = Layout;

const account = (
    <Menu onClick={handleMenuClick}>
        <Menu.Item key="account-setting">
            <Icon type="setting" />
            Edit Account
        </Menu.Item>
        <Menu.Item key="logout">
            <Icon type="logout" />
            Logout
        </Menu.Item>
    </Menu>
);

function handleMenuClick(e) {
    switch (e.key) {
        case 'logout':
            localStorage.clear();
            return this.props.history.push('/login');
        case 'account-setting' :
            console.log("account");
            break;
        default: return
    }
}

class TopBar extends React.Component {
    render() {
        return (
            <Header style={{background: '#fff', padding: 0}}>
                <Row type="flex" justify="end">
                    <Dropdown overlay={account} className='hover-able' placement={"bottomLeft"}>
                        <Col span={2} style={{paddingLeft: '5px'}}>
                            Hi, Username <Avatar/>
                        </Col>
                    </Dropdown>
                </Row>
            </Header>
        );
    }
}

export default withRouter(TopBar);
