import React from "react";
import {Button, message, Modal} from "antd";
import {StoreModalForm} from "./StoreModalForm";
import {saveStore} from "../../services/storeService";

class StoreModal extends React.Component {
    state = {
        visible: this.props.visible,
        cancel: this.props.cancel,
        title: this.props.title,
        fields: {
            id: '',
            name: '',
            ownerId: this.props.owner.id,
        }
    };

    handleFormChange = (changedFields) => {
        this.setState(({fields}) => ({
            fields: {...fields, ...changedFields},
        }))
    };

    handleCancel = () => {
        this.setState({visible: false});
    };

    handleCreate = () => {
        const { form } = this.formRef.props;
        const {id, name, ownerId} = this.state.fields;
        form.validateFields( async (err) => {
            if (!err) {
                const store = {
                    id: id,
                    name: name.value,
                    ownerId: ownerId,
                };
                const response = await saveStore(store);
                if (response.type === 'error') return message.warning(response.message);
                form.resetFields();
                this.setState({ visible: false });
                return message.success('Success created store');
            }
        });
    };

    saveFormRef = formRef => {
        this.formRef = formRef;
    };

    configCancelButton = () => {
        if (this.state.cancel) {
            return (
                <Button key="cancel" onClick={this.handleCancel}>
                    cancel
                </Button>
            )
        }
    };

    render() {
        const {cancel, visible, title, fields} = this.state;
        return (
            <Modal
                closable={cancel}
                maskClosable={cancel}
                visible={visible}
                title={title}
                footer={[
                    this.configCancelButton(),
                    <Button key="submit" type="primary" onClick={this.handleCreate}>
                        Create
                    </Button>,
                ]}
            >
                <StoreModalForm
                    {...fields}
                    wrappedComponentRef={this.saveFormRef}
                    onChange={this.handleFormChange}
                />
            </Modal>
        );
    }
}

export default StoreModal;
