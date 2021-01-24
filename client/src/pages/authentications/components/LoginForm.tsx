import { Form, Input, Button, Row, Alert } from 'antd';
import React, { useState } from 'react';
import { LockOutlined, MailOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { FormError } from '../../../providers/FormProvider';
import LoginService from '../services/LoginService';
import { LoginInput } from '../model/LoginInput';

const LoginForm: React.FC = () => {
    const [inputs, setFormState] = useState<LoginInput>({
        email: '',
        password: '',
    });

    const [{ message, path }, setError] = useState<FormError>({
        message: '',
        path: undefined,
    });

    const [isLoading, setLoading] = useState<boolean>(false);

    const onInputChangeHandler = (e: any) => {
        const { id, value } = e.target;
        setFormState((preState) => ({
            ...preState,
            [id]: value,
        }));
    };

    //= ==========================================
    // FORM SUBMISSION HANDLER
    //= ==========================================
    const formSubmitHandler = async () => {
        await LoginService({
            setSuccess: function () {
                console.log();
            },
            setLoading: setLoading,
            setError: setError,
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

                <Form
                    id={'login-form'}
                    data-testid="login-form"
                    name="login-form"
                    className="login-form"
                    style={{ width: '100%' }}
                    onFinish={formSubmitHandler}
                >
                    <Form.Item
                        name="email"
                        labelCol={{ span: 24 }}
                        // style={{ paddingBottom: path?.email ? '20px' : '0' }}
                        // validateStatus={path?.email ? 'error' : ''}
                        // help={path?.email ? path.email : ''}
                        rules={[
                            {
                                required: true,
                                type: 'email',
                            },
                        ]}
                    >
                        <Input
                            data-testid="email"
                            id="email"
                            value={inputs.email}
                            onChange={onInputChangeHandler}
                            prefix={<MailOutlined className="site-form-item-icon" />}
                            placeholder="Email"
                        />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        labelCol={{ span: 24 }}
                        // style={{ paddingBottom: path?.password ? '20px' : '0' }}
                        // validateStatus={path?.password ? 'error' : ''}
                        // help={path?.password ? path.password : ''}
                        rules={[{ required: true }]}
                    >
                        <Input
                            data-testid="password"
                            id="password"
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            type="password"
                            onChange={onInputChangeHandler}
                            value={inputs.password}
                            placeholder="Password"
                        />
                    </Form.Item>

                    <Form.Item>
                        <Button
                            data-testid="signInButton"
                            type="primary"
                            size="large"
                            loading={isLoading}
                            htmlType="submit"
                            style={{ width: '100%' }}
                        >
                            Login
                        </Button>
                    </Form.Item>
                    <Form.Item>
                        <div style={{ textAlign: 'center' }}>
                            <Link to="/register" className="btn btn-link">
                                Register
                            </Link>
                        </div>
                    </Form.Item>
                </Form>
            </div>
        </Row>
    );
};

export default LoginForm;
