import { LoginOutlined } from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import React from 'react';
import { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FirstLetterCapitalize, SIDEBAR_ROUTES } from '../pages/Routes';
import useAccessTokenProvider from '../providers/AccessTokenProvider';
import { AuthContext } from '../providers/AuthContext';

interface Props {
    isMenuCollapsed: boolean;
}

const { Sider } = Layout;
const SidebarComponent: React.FC<Props> = ({ isMenuCollapsed }) => {
    const user = useContext(AuthContext);
    const [, , removeAuthToken] = useAccessTokenProvider();
    const routes = SIDEBAR_ROUTES().filter((action: any) => action.scope.includes(user?.role.toLowerCase()));
    const { pathname } = useLocation();

    const logout = () => {
        removeAuthToken();
        window.location.replace('/login');
    };
    return (
        <Sider trigger={null} collapsible collapsed={isMenuCollapsed}>
            <div className="logo" />

            <Menu defaultSelectedKeys={[pathname]} theme="dark" mode="inline">
                {routes.map((route) => (
                    <Menu.Item key={route.path} icon={route.icon && <route.icon />}>
                        <Link to={route.path}>{FirstLetterCapitalize(route.title)}</Link>
                    </Menu.Item>
                ))}
                <Menu.Item key="3" onClick={logout} icon={<LoginOutlined style={{ fontSize: 18 }} />}>
                    Exit
                </Menu.Item>
            </Menu>
        </Sider>
    );
};

export default SidebarComponent;
