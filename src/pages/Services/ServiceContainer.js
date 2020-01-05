import React from 'react';
import {Table, message, Button, Row, Modal} from 'antd';
import {deleteServiceById, fetchService} from '../../services/servicesService';
import Page from '../../components/Page/Page';
import {ServicesAction} from '../../util/Action';
import {connect} from 'react-redux';
import ServiceModal from "./ServiceModal";
import DropOption from "../../components/DropOption/DropOption";

const { confirm } = Modal;

class ServiceContainer extends React.Component {
    state = {
        isLoading: true,
        isShowModal: false,
    };

    componentDidMount() {
        this.fetchAllService().then(() => {
                this.setState({isLoading: false})
            }
        )
    }

    deleteService = (id) => {

    };

    render() {
        const {isShowModal} = this.state;

        const columns = [
            {
                title: 'Name',
                dataIndex: 'name',
                key: 'name',
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
                    <DropOption
                        onMenuClick={e => handleActionClick(record, e, this.fetchAllService)}
                        menuOptions={[
                            { key: 'update', name: `Update`},
                            { key: 'delete', name: `Delete`},
                        ]}
                    />
                ),
            },
        ];

        const handleActionClick = async (record, e, fetchAll) => {
            switch (e.key) {
                case 'update':
                    this.props.dispatch({type: ServicesAction.SAVE_SERVICES_FORM, payload: record});
                    return this.showModal();
                case 'delete':
                    confirm({
                        title: `Are you sure delete this record?`,
                        onOk() {
                            return deleteServiceById(record.id).then(() => {
                                message.success('Success deleted data');
                                return fetchAll();
                            });
                        },
                    });
                    break;
                default: return;
            }
        };

        return (
            <Page inner>
                <ServiceModal visible={isShowModal} fetchAll={this.fetchAllService} handleCancel={this.closeModal}/>
                <Row type="flex" justify="end" style={{marginBottom: '20px'}}>
                    <Button type={"primary"} icon="plus" onClick={() => {this.showModal()}}>Add Service</Button>
                </Row>
                <Table loading={this.state.isLoading} rowKey={record => record.id} columns={columns}
                       dataSource={this.props.services}/>
            </Page>
        )
    }

    showModal = () => {
        return this.setState({...this.state, isShowModal: true});
    };

    closeModal = () => {
        this.props.dispatch({type: ServicesAction.CLEAR_FORM});
        return this.setState({...this.state, isShowModal: false})
    };

    fetchAllService = async () => {
        const response = await fetchService();
        if (response.type === 'error') return message.warning(response.message);
        this.props.dispatch({type: ServicesAction.FETCH_SERVICES, payload: response});
    };
}

const mapStateToProps = (state) => ({
    ...state.services
});

export default connect(mapStateToProps)(ServiceContainer);
