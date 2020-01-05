import React from "react";
import {message, Modal} from "antd";
import {saveService} from "../../services/servicesService";
import {isEmpty} from 'lodash'
import {getSelectedStore} from "../../services/storeService";
import {connect} from "react-redux";
import {ServiceModalForm} from "./ServiceModalForm";

class ServiceModal extends React.Component {
    handleCreate = () => {
        const { form } = this.formRef.props;
        form.validateFields( async (err, value) => {
            if (!err) {
                const service = {
                    id: value.id,
                    name: value.name,
                    price: value.price,
                    storeId: getSelectedStore(),
                };
                const response = await saveService(service);
                if (response.type === 'error') return message.warning(response.message);
                form.resetFields();
                message.success('Success saved store');
                this.props.handleCancel();
                return this.props.fetchAll();
            }
        });
    };

    handleCancel = () => {
        const { form } = this.formRef.props;
        const {handleCancel} = this.props;
        form.resetFields();
        return handleCancel()
    };

    saveFormRef = formRef => {
        this.formRef = formRef;
    };

    render() {
        const {visible, service} = this.props;
        return (
            <Modal
                visible={visible}
                closable={false}
                title={isEmpty(service) ? 'Create a new service' : 'Update selected service'}
                onCancel={this.handleCancel}
                okText={'Save'}
                onOk={this.handleCreate}
            >
                <ServiceModalForm
                    {...service}
                    wrappedComponentRef={this.saveFormRef}
                    onChange={this.handleFormChange}
                />
            </Modal>
        );
    }
}

const mapStateToProps = (state) => ({
    service : {...state.services.serviceForm}
});

export default connect(mapStateToProps)(ServiceModal);
