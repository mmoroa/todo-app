import { Col, Row } from 'antd';
import React from 'react';
import Text from 'antd/lib/typography/Text';
import LoginForm from './components/LoginForm';

const LoginPage: React.FC = () => {
    return (
        <Row>
            <Col xs={0} sm={0} md={0} lg={12} xl={12}>
                <div
                    style={{
                        backgroundImage: "url('assets/img/calendar.png')",
                        height: '100vh',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                >
                    <div style={{ position: 'absolute', bottom: 20, left: 24 }}>
                        <Text className="text-black">{`© ${new Date().getFullYear()}`}</Text>
                    </div>
                </div>
            </Col>
            <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                <div>
                    <LoginForm />
                </div>
            </Col>
        </Row>
    );
};

export default LoginPage;
