import React from "react";
import {Form, Input} from 'antd';

export const StoreModalForm = Form.create({
    name: 'store_modal',
    onFieldsChange(props, changedFields) {
        props.onChange(changedFields)
    },
})(
    class extends React.Component {
        componentDidMount() {
            const {name} = this.props;
            // To disable submit button at the beginning.
            this.props.form.validateFields();
            this.props.form.setFieldsValue({
                name: name
            })
        }

        render() {
            const {getFieldDecorator} = this.props.form;

            return (
                <Form layout="vertical">
                    <Form.Item label="Store Name">
                        {getFieldDecorator('name', {
                            rules: [{required: true, message: 'Input your store name!'}],
                        })(<Input/>)}
                    </Form.Item>
                </Form>
            );
        }
    }
);
