import React from "react";
import Logo from "../../../assets/enigmacamp.jpeg";
import {Button, Form, Icon, Input} from "antd";
import {Link} from "react-router-dom";

function hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class ForgotPasswordForm extends React.Component {
    componentDidMount() {
        // To disable submit button at the beginning.
        this.props.form.validateFields();
    }

    render() {
        const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;

        // Only show error after a field is touched.
        const usernameError = isFieldTouched('username') && getFieldError('username');

        return (
            <div className='login-form' style={{width: '400px', left: '48%', height: '350px'}}>
                <div className='logo' style={{marginBottom: '60px'}}>
                    <img alt='Logo' src={Logo}/>
                </div>
                <Form layout="horizontal" onSubmit={this.handleSubmit}>
                    <Form.Item validateStatus={usernameError ? 'error' : ''} help={usernameError || ''}>
                        {getFieldDecorator('username', {
                            rules: [{ required: true, message: 'Please input your username!' }],
                        })(
                            <Input
                                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                name="username"
                                placeholder="Username"
                            />,
                        )}
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" disabled={hasErrors(getFieldsError())}>
                            Reset Password
                        </Button>
                        Or <Link to="login">login now !</Link>
                    </Form.Item>
                </Form>
            </div>
        );
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    };
}

const ForgotPassword = Form.create({ name: 'forgotPassword' })(ForgotPasswordForm);

export default ForgotPassword;
