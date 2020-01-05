import React from 'react';
import {message, Modal} from "antd";
import { getSelectedStore } from '../../services/storeService';
import { saveItem } from '../../services/itemService';
import { ItemModalForm } from './ItemModalForm';

class ItemModal extends React.Component {
    state = {
        title: this.props.title,
        closable: this.props.closable,
        fields: {
            name: '',
            price: '',
            storeId: getSelectedStore(),
        }
    };

    handleFormChange = (changedFields) => {
        this.setState(({fields}) => ({
            fields: { ...fields, ...changedFields},
        }))
    };

    handleCreate = () => {
        const { form } = this.formRef.props;
        const {id, name, price, storeId} = this.state.fields;
        form.validateFields( async (err) => {
            if (!err) {
                const item = {
                    id: id,
                    name: name.value,
                    price: price.value,
                    storeId: storeId,
                };
                const response = await saveItem(item);
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
                <ItemModalForm
                    {...fields}
                    wrappedComponentRef={this.saveFormRef}
                    onChange={this.handleFormChange}
                />
            </Modal>
        );
    }
}

export default ItemModal;