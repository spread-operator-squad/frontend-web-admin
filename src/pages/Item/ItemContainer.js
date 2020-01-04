import React from 'react'
import { Table, Divider, Modal, message } from 'antd';
import { fetchItem, deleteItemById } from '../../services/itemService';
import Page from '../../components/Page/Page';
import { ItemAction } from '../../util/Action';
import { connect } from 'react-redux';

const { confirm } = Modal;

// const handleAction = (record) => {
    
//             onMenuClick={e => handleActionClick(record, e)}
//             menuOptions={[
//                 { key: 'edit', name: 'Edit'},
//                 { key: 'delete', name: 'Delete',}
//             ]}
    
// }

const columns = [
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        render: text => <a>{text}</a>,
    },
    {
        title: 'Price',
        dataIndex: 'price',
        key: 'price',
    },
    {
        title: 'Action',
        key: 'action',
        render: (text, record) => (
              
            <span>
                <a>Edit</a>
                <Divider type="vertical" />
                <a>Delete</a>
            </span>
        ),
    },
];

const handleDeleteItem = async (id) => {
    const response = await deleteItemById(id);
    if (response.type === 'error') return message.warning(response.message);
}

const handleActionClick = async (record, e) => {
    switch (e.key) {
        case 'edit':
            return message.success('edit success');
        case 'delete':
            confirm({
                title: 'Are you sure you want to delete this record?',
                onOk() {
                    handleDeleteItem(record.id);
                    return message.success('Delete success');
                },
            });
            break;
        default: return;
    }
}

class ItemContainer extends React.Component {
    state = {
        isLoading: true,
        status: false
    }

    componentDidMount() {
        this.fetchAllItems().then(
            this.setState({ status: true, isLoading: false })
        );
    }

    render() {
        return (
            <Page inner>
                <Table loading={this.state.isLoading} rowKey={record => record.id} columns={columns} dataSource={this.props.items} />
            </Page>
        );
    }

    fetchAllItems = async () => {
        const response = await fetchItem();
        if (response.type === 'error') return message.warning(response.message);
        this.props.dispatch({ type: ItemAction.FETCH_ITEMS, payload: response })
    }
}

const mapStateToProps = (state) => ({
    ...state.items
});

export default connect(mapStateToProps)(ItemContainer);