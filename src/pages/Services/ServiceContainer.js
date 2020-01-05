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
        service: {}
    };

    componentDidMount() {
        this.fetchAllService().then(() => {
                this.setState({isLoading: false})
            }
        )
    }

    render() {
        const {isShowModal, service} = this.state;

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
                        onMenuClick={e => handleActionClick(record, e)}
                        menuOptions={[
                            { key: 'update', name: `Update`},
                            { key: 'delete', name: `Delete`},
                        ]}
                    />
                ),
            },
        ];

        const handleActionClick = async (record, e) => {
            switch (e.key) {
                case 'update':
                    return this.showModal(record);
                case 'delete':
                    confirm({
                        title: `Are you sure delete this record?`,
                        onOk() {
                            return deleteServiceById(record.id).then(
                                message.success('Success deleted data')
                            );
                        },
                    });
                    break;
                default: return;
            }
        };

        return (
            <Page inner>
                <ServiceModal title={"Create a new service"} service={service} visible={isShowModal} handleCancel={this.closeModal}/>
                <Row type="flex" justify="end" style={{marginBottom: '20px'}}>
                    <Button type={"primary"} icon="plus" onClick={this.showModal}>Add Service</Button>
                </Row>
                <Table loading={this.state.isLoading} rowKey={record => record.id} columns={columns}
                       dataSource={this.props.services}/>
            </Page>
        )
    }

    showModal = (payload) => {
        return this.setState({...this.state, isShowModal: true, service: payload});
    };

    closeModal = () => {
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
