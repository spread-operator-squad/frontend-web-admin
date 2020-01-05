import React from "react";
import {getSelectedStore} from "../../services/storeService";
import {message, Modal} from "antd";
import {ServiceModalForm} from "./ServiceModalForm";
import {saveService} from "../../services/servicesService";

class ServiceModal extends React.Component {
    state = {
        title: this.props.title,
        closable: this.props.closeable,
        fields: {
            name: '',
            price: '',
            storeId: getSelectedStore(),
        }
    };

    handleFormChange = (changedFields) => {
        this.setState(({fields}) => ({
            fields: {...fields, ...changedFields},
        }))
    };

    handleCreate = () => {
        const { form } = this.formRef.props;
        const {id, name, price, storeId} = this.state.fields;
        form.validateFields( async (err) => {
            if (!err) {
                const service = {
                    id: id,
                    name: name.value,
                    price: price.value,
                    storeId: storeId,
                };
                const response = await saveService(service);
                if (response.type === 'error') return message.warning(response.message);
                form.resetFields();
                message.success('Success created store');
                return this.props.handleCancel()
            }
        });
    };

    saveFormRef = formRef => {
        this.formRef = formRef;
    };

    render() {
        const {visible, handleCancel} = this.props;
        const {title, fields} = this.state;
        console.log(fields)
        return (
            <Modal
                visible={visible}
                closable={false}
                title={title}
                onCancel={handleCancel}
                okText={'Create'}
                onOk={this.handleCreate}
            >
                <ServiceModalForm
                    {...fields}
                    wrappedComponentRef={this.saveFormRef}
                    onChange={this.handleFormChange}
                />
            </Modal>
        );
    }
}

export default ServiceModal;
