import React from "react";
import Page from "../../components/Page/Page";
import {Divider, message, Table, Tabs} from "antd";
import {connect} from "react-redux";
import {getAllUser} from "../../services/userService";
import {UsersAction} from "../../util/Action";

const {TabPane} = Tabs;

const EnumUserStatus = {
    ACTIVE: true,
    INACTIVE: false,
};

const columns = [
    {title: 'Username', dataIndex: 'username', key: 'username'},
    {title: 'Role', dataIndex: 'roles', key: 'roles'},
    {
        title: 'Action',
        key: 'action',
        render: (text, record) => (
            <span>
                <a>Confirm Data</a>
                <Divider type="vertical"/>
                <a>Delete</a>
            </span>
        ),
    },
];

class UserContainer extends React.Component {
    handleTabClick = (key) => {
        const {history} = this.props;
        const {pathname} = this.props.location;
        return history.push({
            pathname,
            state: {
                status: key
            }
        });
    };

    componentDidMount() {
        this.fetchAllUser();
    }

    fetchAllUser = async () => {
        const response = await getAllUser();
        if (response.type === 'error') return message.warning(response.message);
        this.props.dispatch({type: UsersAction.FETCH_USERS, payload: response});
    };

    render() {
        // console.log(this.props.location.state.status);
        return (
            <Page inner>
                <Tabs defaultActiveKey="1" onChange={this.handleTabClick}>
                    <TabPane tab="Inactive" key={EnumUserStatus.INACTIVE}>
                        <Table columns={columns} dataSource={this.props.users}/>
                    </TabPane>
                    <TabPane tab="Active" key={EnumUserStatus.ACTIVE}>
                        Content of Tab Pane 2
                    </TabPane>
                </Tabs>
            </Page>
        );
    }
}

const mapStateToProps = (state) => ({
    ...state.users
});

export default connect(mapStateToProps)(UserContainer);
