import React from "react";
import Logo from "../../../assets/enigmacamp.jpeg";
import {Button, DatePicker, message, Radio, Form, Icon, Input} from "antd";
import {Link} from "react-router-dom";
import {doRegister} from "../../../services/authenticationService";

function hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class RegistrationForm extends React.Component {

    state = {
        confirmDirty: false,
        current: 0,
    };

    componentDidMount() {
        // To disable submit button at the beginning.
        this.props.form.validateFields();
    }

    render() {
        const {getFieldDecorator, getFieldsError, getFieldError, isFieldTouched} = this.props.form;

        // Only show error after a field is touched.
        const usernameError = isFieldTouched('username') && getFieldError('username');
        const passwordError = isFieldTouched('password') && getFieldError('password');
        const confirmPasswordError = isFieldTouched('confirm-password') && getFieldError('confirm-password');
        const nameError = isFieldTouched('name') && getFieldError('name');
        const birthDateError = isFieldTouched('birthDate') && getFieldError('birthDate');
        const phoneNumberError = isFieldTouched('phoneNumber') && getFieldError('phoneNumber');
        const genderError = isFieldTouched('gender') && getFieldError('gender');

        return (
            <div className='login-form' style={{width: '450px', height: '700px', left: '45%', top: '30%'}}>
                <div className='logo'>
                    <img alt='Logo' src={Logo}/>
                </div>
                <Form layout="vertical" onSubmit={this.handleSubmit}>
                    <Form.Item validateStatus={usernameError ? 'error' : ''} help={usernameError || ''} hasFeedback>
                        {getFieldDecorator('username', {
                            rules: [{required: true, message: 'Please input your nickname!', whitespace: true}],
                        })(<Input
                            prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
                            name="username"
                            placeholder="Username"
                        />)}
                    </Form.Item>
                    <Form.Item validateStatus={passwordError ? 'error' : ''} help={passwordError || ''} hasFeedback={true}>
                        {getFieldDecorator('password', {
                            rules: [
                                {required: true, message: 'Password must be more than 6 characters!', whitespace: true, min: 6},
                                {validator: this.validateToNextPassword,}
                            ],
                        })(<Input.Password
                            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            name="password"
                            placeholder="Password"
                        />)}
                    </Form.Item>
                    <Form.Item validateStatus={confirmPasswordError ? 'error' : ''} help={confirmPasswordError || ''} hasFeedback>
                        {getFieldDecorator('confirm-password', {
                            rules: [
                                {required: true, message: 'Please confirm your password!', whitespace: true},
                                {validator: this.compareToFirstPassword,}
                            ],
                        })(<Input.Password
                            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="Confirm Password" onBlur={this.handleConfirmBlur}/>)}
                    </Form.Item>

                    <Form.Item validateStatus={nameError ? 'error' : ''} help={nameError || ''} hasFeedback>
                        {getFieldDecorator('name', {
                            rules: [{required: true, message: 'Please input your name!', whitespace: true}],
                        })(<Input
                            prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
                            name="name"
                            placeholder="Your Full Name"
                        />)}
                    </Form.Item>
                    <Form.Item validateStatus={phoneNumberError ? 'error' : ''} help={phoneNumberError || ''} hasFeedback>
                        {getFieldDecorator('phoneNumber', {
                            rules: [{required: true, message: 'Please input your phone number!', whitespace: true}],
                        })(<Input
                            prefix={<Icon type="phone" style={{color: 'rgba(0,0,0,.25)'}}/>}
                            name="phoneNumber"
                            placeholder="Your Phone Number"
                        />)}
                    </Form.Item>
                    <Form.Item validateStatus={birthDateError ? 'error' : ''} help={birthDateError || ''} hasFeedback>
                        {getFieldDecorator('birthDate',{
                                rules: [{required: true, message: 'Please select your birth date!'}],
                        })(<DatePicker style={{width: '100%'}}
                            placeholder="Your Birth Date"
                            />)}
                    </Form.Item>
                    <Form.Item validateStatus={genderError ? 'error' : ''} help={genderError || ''}>
                        {getFieldDecorator('gender', {
                            rules: [{required: true, message: 'Please select your gender!'}],
                        })(<Radio.Group name='gender'>
                                <Radio value="Male">Male</Radio>
                                <Radio value="Female">Female</Radio>
                            </Radio.Group>,
                        )}
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" disabled={hasErrors(getFieldsError())}>
                            Register
                        </Button>
                        <br/><br/>
                        Or <Link to="login">login now !</Link>
                    </Form.Item>
                </Form>
            </div>
        );
    }

    next() {
        const current = this.state.current + 1;
        this.setState({ current });
    }

    prev() {
        const current = this.state.current - 1;
        this.setState({ current });
    }

    handleConfirmBlur = e => {
        const {value} = e.target;
        this.setState({confirmDirty: this.state.confirmDirty || !!value});
    };

    compareToFirstPassword = (rule, value, callback) => {
        const {form} = this.props;
        if (value && value !== form.getFieldValue('password')) {
            callback('Two passwords that you enter is inconsistent!');
        } else {
            callback();
        }
    };

    validateToNextPassword = (rule, value, callback) => {
        const {form} = this.props;
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirm'], {force: true});
        }
        callback();
    };

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields( async (err, values) => {
            if (!err) {
                let birthDate = values['birthDate'].format('YYYY-MM-DD');
                const registrationForm = {
                    username: values['username'],
                    password: values['password'],
                    roles: ["ROLE_OWNER"],
                    userDetail: {
                        name: values['name'],
                        phoneNumber: parseInt(values['phoneNumber']),
                        birthDate: birthDate,
                        gender: values['gender']
                    }
                };
                const response = await doRegister(registrationForm);
                if (response.type === 'error') return message.warning(response.message);
                this.props.form.resetFields();
                return message.success('Success registration, your account is under review');
            }
        });
    };
}

const Registration = Form.create({name: 'registration'})(RegistrationForm);

export default Registration;
