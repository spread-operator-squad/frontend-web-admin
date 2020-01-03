import React from "react";
import {Form, Icon, Input, Button, Checkbox, message} from 'antd';
import Logo from '../../../assets/enigmacamp.jpeg';
import {Link} from "react-router-dom";
import {doLogin} from "../../../services/authenticationService";

function hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class LoginForm extends React.Component {
    componentDidMount() {
        // To disable submit button at the beginning.
        this.props.form.validateFields();
    }

    render() {
        const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;

        // Only show error after a field is touched.
        const usernameError = isFieldTouched('username') && getFieldError('username');
        const passwordError = isFieldTouched('password') && getFieldError('password');
        return (
            <div className='login-form'>
                <div className='logo'>
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
                    <Form.Item validateStatus={passwordError ? 'error' : ''} help={passwordError || ''}>
                        {getFieldDecorator('password', {
                            rules: [{ required: true, message: 'Please input your Password!' }],
                        })(
                            <Input
                                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                name="password"
                                type="password"
                                placeholder="Password"
                            />,
                        )}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('remember', {
                            valuePropName: 'checked',
                            initialValue: true,
                        })(<Checkbox name="remember">Remember me</Checkbox>)}
                        <Link className="login-form-forgot" to="forgot-password">
                            Forgot password
                        </Link>
                        <Button type="primary" htmlType="submit" disabled={hasErrors(getFieldsError())}>
                            Log in
                        </Button>
                        Or <Link to="register">register now!</Link>
                    </Form.Item>
                </Form>
            </div>
        );
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields( async (err, values) => {
            if (!err) {
                const loginForm = {
                    username: values['username'],
                    password: values['password']
                };
                const response = await doLogin(loginForm);
                if (response.type === 'error') return message.warning(response.message);
            }
        });
    };
}

const Login = Form.create({ name: 'login' })(LoginForm);

export default Login;
