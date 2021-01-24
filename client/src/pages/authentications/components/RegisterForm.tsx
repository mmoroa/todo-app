import { Form, Input, Button, Row, Alert } from 'antd';
import React, { useState } from 'react';
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { FormError } from '../../../providers/FormProvider';
import { RegisterInput } from '../model/RegisterInput';
import RegisterService from '../services/ RegisterService';

const RegisterForm: React.FC = () => {
    const [inputs, setFormState] = useState<RegisterInput>({
        email: '',
        password: '',
        username: '',
    });

    const [succsss, setSuccess] = useState<boolean>(false);

    const [{ message, path }, setError] = useState<FormError>({
        message: '',
        path: undefined,
    });

    const [isLoading, setLoading] = useState<boolean>(false);

    const onInputChangeHandler = (e: any) => {
        const { id, value } = e.target;

        console.log(e.target);

        setFormState((preState) => ({
            ...preState,
            [id]: value,
        }));
    };

    //= ==========================================
    // FORM SUBMISSION HANDLER
    //= ==========================================
    const formSubmitHandler = async () => {
        await RegisterService({
            setLoading: setLoading,
            setError: setError,
            setSuccess: setSuccess,
            values: inputs,
        });
    };

    //= ==========================================
    // FORM BUILDER
    //= ==========================================
    return (
        <Row justify="space-around" align="middle">
            <div style={{ width: 360, marginTop: 150 }}>
                <div style={{ marginBottom: 50, textAlign: 'center' }}>
                    <img alt="rcs account status logo" src="assets/img/logo1.png" />
                </div>

                {path ? (
                    <div style={{ paddingBottom: '20px' }}>
                        {' '}
                        <Alert message="Error" description={message} type="error" showIcon />
                    </div>
                ) : (
                    ''
                )}

                {succsss ? (
                    <div style={{ paddingBottom: '20px' }}>
                        {' '}
                        <Alert
                            message="Registration Completed"
                            description={'You have Successfully Registered'}
                            type="success"
                            showIcon
                        />
                    </div>
                ) : (
                    ''
                )}

                <Form
                    data-testid="register-form"
                    name="register-form"
                    className="register-form"
                    style={{ width: '100%' }}
                    id={'register-form'}
                    onFinish={formSubmitHandler}
                >
                    <Form.Item
                        name="username"
                        labelCol={{ span: 24 }}
                        // style={{ paddingBottom: path?.usernmae ? '20px' : '0' }}
                        // validateStatus={path?.username ? 'error' : ''}
                        // help={path?.email ? path.username : ''}
                        rules={[{ required: true, message: 'Username is required' }]}
                    >
                        <Input
                            data-testid="username"
                            id="username"
                            value={inputs.username}
                            onChange={onInputChangeHandler}
                            prefix={<UserOutlined className="site-form-item-icon" />}
                            placeholder="Username"
                        />
                    </Form.Item>
                    <Form.Item
                        // labelCol={{ span: 24 }}
                        // style={{ paddingBottom: path?.email ? '20px' : '0' }}
                        // validateStatus={path?.email ? 'error' : ''}
                        // help={path?.email ? path.email : ''}
                        name="email"
                        rules={[
                            {
                                required: true,
                                type: 'email',
                            },
                        ]}
                    >
                        <Input
                            id="email"
                            data-testid="email"
                            value={inputs.email}
                            onChange={onInputChangeHandler}
                            prefix={<MailOutlined className="site-form-item-icon" />}
                            placeholder="Email Address"
                        />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        labelCol={{ span: 24 }}
                        // style={{ paddingBottom: path?.password ? '20px' : '0' }}
                        // validateStatus={path?.password ? 'error' : ''}
                        // help={path?.password ? path.password : ''}
                        rules={[{ required: true, message: 'password is required' }]}
                    >
                        <Input
                            id="password"
                            data-testid="password"
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            type="password"
                            onChange={onInputChangeHandler}
                            value={inputs.password}
                            placeholder="Password"
                        />
                    </Form.Item>

                    <Form.Item>
                        <Button
                            data-testid="signUpButton"
                            type="primary"
                            size="large"
                            loading={isLoading}
                            htmlType="submit"
                            style={{ width: '100%' }}
                        >
                            Register
                        </Button>
                    </Form.Item>
                    <Form.Item>
                        <div style={{ textAlign: 'center' }}>
                            <Link to="/login" className="btn btn-link">
                                Login
                            </Link>
                        </div>
                    </Form.Item>
                </Form>
            </div>
        </Row>
    );
};

export default RegisterForm;
