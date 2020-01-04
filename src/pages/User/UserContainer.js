import React from "react";
import Page from "../../components/Page/Page";
import {message, Modal, Table, Tabs} from "antd";
import {connect} from "react-redux";
import {activateUserById, blockUserById, deleteUserById, getAllUserByActiveStatus} from "../../services/userService";
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

const handleActivateUser = async (id) => {
    const response = await activateUserById(id);
    if (response.type === 'error') return message.warning(response.message);
};

const handleBlockUser = async (id) => {
    const response = await blockUserById(id);
    if (response.type === 'error') return message.warning(response.message);
};

const handleDeleteUser = async (id) => {
    const response = await deleteUserById(id);
    if (response.type === 'error') return message.warning(response.message);
};

const handleActionClick = async (record, e) => {
    switch (e.key) {
        case 'activate':
            await handleActivateUser(record.id);
            return message.success(`Success activate account ${record.username}`);
        case 'block':
            await handleBlockUser(record.id);
            return message.success(`Success block user ${record.username}`);
        case 'delete':
            confirm({
                title: `Are you sure delete this record?`,
                onOk() {
                    handleDeleteUser(record.id);
                    return message.success('Success deleted');
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
