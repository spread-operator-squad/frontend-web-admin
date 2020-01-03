import React from "react";
import {Menu, Dropdown, Avatar, Icon, Layout, Row, Col} from "antd";

const {Header} = Layout;

class TopBar extends React.Component {
    account = () => (
        <Menu onClick={this.handleMenuClick}>
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

    handleMenuClick = (e) => {
        console.log(this.props);
        switch (e.key) {
            case 'logout':
            localStorage.clear();
            return this.props.history.push('/login');
            case 'account-setting' :
                break;
            default: return
        }
    };

    render() {
        return (
            <Header style={{background: '#fff', padding: 0}}>
                <Row type="flex" justify="end">
                    <Dropdown overlay={this.account} className='hover-able' placement={"bottomLeft"}>
                        <Col span={2} style={{paddingLeft: '5px'}}>
                            Hi, Username <Avatar/>
                        </Col>
                    </Dropdown>
                </Row>
            </Header>
        );
    }
}

export default TopBar;
