import React from "react";
import {Form, Input, InputNumber} from "antd";

export const ServiceModalForm = Form.create({
    name: 'service_modal'
})(
    class extends React.Component {
        componentDidMount() {
            // To disable submit button at the beginning.
            this.props.form.validateFields();
        }

        render() {
            const {id, name, price} = this.props;
            const {getFieldDecorator} = this.props.form;
            return (
                <Form layout="vertical">
                    <Form.Item>
                        {getFieldDecorator('id', {
                            initialValue: id
                        })(<Input hidden={true}/>)}
                    </Form.Item>
                    <Form.Item label="Service Name">
                        {getFieldDecorator('name', {
                            initialValue: name,
                            rules: [{required: true, message: 'Input your service name!'}],
                        })(<Input/>)}
                    </Form.Item>
                    <Form.Item label="Price">
                        {getFieldDecorator('price', {
                            initialValue: price,
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
