import React from 'react'
import { Table, Button, Modal, message, Row } from 'antd';
import { fetchItem, deleteItemById, } from '../../services/itemService';
import Page from '../../components/Page/Page';
import { ItemAction } from '../../util/Action';
import { connect } from 'react-redux';
import DropOption from '../../components/DropOption/DropOption';
import ItemModal from './ItemModal';

const { confirm } = Modal;

class ItemContainer extends React.Component {
    state = {
        isLoading: true,
        isShowModal: false,
        items: {}
    };

    componentDidMount() {
        this.fetchAllItems().then(
            this.setState({ isLoading: false })
        );
    }

    render() {
        const { isShowModal, item } = this.state;

        const columns = [
            {
                title: 'Name',
                dataIndex: 'name',
                key: 'name'
            },
            {
                title: 'Price',
                dataIndex: 'price',
                key: 'price'
            },
            {
                title: 'Action',
                key: 'action',
                render: (text, record) => (
                    <DropOption
                        onMenuClick={e => handleActionClick(record, e)}
                        menuOptions={[
                            { key:'update', name:'Update' },
                            { key:'delete', name:'Delete' }
                        ]}
                    />
                ),
            }
        ]

        const handleActionClick = async (record, e) => {
            switch (e.key) {
                case 'update':
                    return this.showModal(record);
                case 'delete':
                    confirm({
                        title: 'Are you sure you want to delete this record?',
                        onOk() {
                            return deleteItemById(record.id).then(
                                message.success('Data successfully deleted')
                            );
                        },
                    });
                    break;
                default:
                    return;
            }
        }

        return (
            <Page inner>
                <ItemModal title={"Create new item"} item={item} visible={isShowModal} handleCancel={this.closeModal}/>
                <Row type="flex" justify="end" style={{marginBottom: '20px'}}>
                    <Button type={"primary"} icon="plus" onClick={this.showModal}>Add Item</Button>
                </Row>
                <Table loading={this.state.isLoading} rowKey={record => record.id} columns={columns} dataSource={this.props.items} />
            </Page>
        );
    }

    showModal = (payload) => {
        return this.setState({...this.state, isShowModal: true, item: payload});
    };

    closeModal = () => {
        return this.setState({...this.state, isShowModal: false})
    };

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