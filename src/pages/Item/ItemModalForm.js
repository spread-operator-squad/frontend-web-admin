import React from "react";
import {Form, Input, InputNumber} from "antd";

export const ItemModalForm = Form.create({
    name: 'item_modal',
    onFieldsChange(props, changedFields) {
        props.onChange(changedFields)
    },
})(
    class extends React.Component {
        componentDidMount() {
            const {name, price} = this.props;
            // To disable submit button at the beginning.
            this.props.form.validateFields();
            this.props.form.setFieldsValue({
                name: name,
                price: price
            })
        }

        render() {
            const {getFieldDecorator} = this.props.form;
            return (
                <Form layout="vertical">
                    <Form.Item label="Item Name">
                        {getFieldDecorator('name', {
                            rules: [{required: true, message: 'Input your item name!'}],
                        })(<Input/>)}
                    </Form.Item>
                    <Form.Item label="Price">
                        {getFieldDecorator('price', {
                            rules: [{required: true, message: 'Input your valid price!', type: 'number'}],
                        })(<InputNumber
                            style={{width: '100%'}}
                            formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                            parser={value => value.replace(/\$\s?|(,*)/g, '')}
                        />)}
                    </Form.Item>
                </Form>
            );
        }
    }
);
