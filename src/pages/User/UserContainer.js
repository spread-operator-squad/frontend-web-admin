import React from "react";
import Page from "../../components/Page/Page";
import {message, Modal, Table, Tabs} from "antd";
import {connect} from "react-redux";
import {getAllUserByActiveStatus} from "../../services/userService";
import {UsersAction} from "../../util/Action";
import DropOption from "../../components/DropOption/DropOption";

const {TabPane} = Tabs;
const { confirm } = Modal;

const EnumUserStatus = {
    ACTIVE: 'true',
    INACTIVE: 'false',
};

const handleAction = (record) => {
    if (record.isActive) {
        return (
            <DropOption
                onMenuClick={e => handleActionClick(record, e)}
                menuOptions={[
                    { key: 'block', name: `Block User`},
                    { key: 'delete', name: `Delete`},
                ]}
            />
        )
    } else {
        return (
            <DropOption
                onMenuClick={e => handleActionClick(record, e)}
                menuOptions={[
                    { key: 'activate', name: `Activate User`},
                    { key: 'delete', name: `Delete`},
                ]}
            />
        )
    }
};

const columns = [
    {title: 'Username', dataIndex: 'username', key: 'username'},
    {title: 'Role', dataIndex: 'roles', key: 'roles'},
    {
        title: 'Action',
        key: 'action',
        fixed: 'right',
        render: (text, record) => (
            handleAction(record)
        ),
    },
];

const handleActionClick = (record, e) => {
    switch (e.key) {
        case 'activate':

            console.log('active');
            break;
        case 'block':
            console.log('block');
            break;
        case 'delete':
            confirm({
                title: `Are you sure delete this record?`,
                onOk() {
                    console.log("oke")
                    // onDeleteItem(record.id)
                },
            });
            break;
        default: return;
    }
};

class UserContainer extends React.Component {

    state = {
        isLoading: true,
        status: false
    };

    handleTabClick = (key) => {
        switch (key) {
            case EnumUserStatus.INACTIVE:
                this.setState({status: false, isLoading: true});
                this.fetchAllUser(false).then(
                    this.setState({status: true, isLoading: false})
                );
                break;
            case EnumUserStatus.ACTIVE:
                this.setState({status: true, isLoading: true});
                return this.fetchAllUser(true).then(
                    this.setState({status: true, isLoading: false})
                );
            default : return;
        }
    };

    componentDidMount() {
        this.fetchAllUser(false).then(
            this.setState({status: true, isLoading: false})
        );
    }

    fetchAllUser = async (isActive) => {
        // this.setState(this.setState({...this.setState({...this.state, loading: true})}));
        const response = await getAllUserByActiveStatus(isActive);
        if (response.type === 'error') return message.warning(response.message);
        this.props.dispatch({type: UsersAction.FETCH_USERS, payload: response});
    };

    render() {
        return (
            <Page inner>
                <Tabs animated={false} onChange={this.handleTabClick}>
                    <TabPane tab="Inactive" key={EnumUserStatus.INACTIVE}>
                        <Table loading={this.state.isLoading} rowKey={record => record.id} columns={columns} dataSource={this.props.users}/>
                    </TabPane>
                    <TabPane tab="Active" key={EnumUserStatus.ACTIVE}>
                        <Table loading={this.state.isLoading} rowKey={record => record.id} columns={columns} dataSource={this.props.users}/>
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
