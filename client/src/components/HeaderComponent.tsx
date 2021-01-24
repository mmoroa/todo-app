import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import React from 'react';
import { Layout } from 'antd';
interface Props {
    isMenuCollapsed: boolean;
    setMenuState: any;
}

const { Header } = Layout;
const HeaderComponent: React.FC<Props> = ({ isMenuCollapsed, setMenuState }) => {
    const toggleMenu = () => setMenuState(!isMenuCollapsed);
    return (
        <Header className="site-layout-background" style={{ padding: 0 }}>
            {React.createElement(isMenuCollapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                className: 'trigger',
                style: { padding: '0 20px', fontSize: '20px' },
                onClick: toggleMenu,
            })}
        </Header>
    );
};

export default HeaderComponent;
