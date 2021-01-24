import { Layout } from 'antd';
import React, { useEffect, useState } from 'react';
import { Redirect, Route, Switch, useHistory } from 'react-router-dom';
import HeaderComponent from '../components/HeaderComponent';
import LoaderComponent from '../components/LoaderComponent';
import SidebarComponent from '../components/SidebarComponent';
import AuthorisedUserProfileService from '../pages/authentications/services/AuthorisedUserProfileService';
import { RouteProps } from '../pages/Routes';
import { AuthProfile } from '../pages/users/model/User';
import useAccessTokenProvider from './AccessTokenProvider';
import { AuthContext } from './AuthContext';
import { FormError } from './FormProvider';
import { generateTitleRoute } from './PageTitleProvider';

interface Props {
    routes: RouteProps[];
}

const { Content } = Layout;

const TemplateProvider: React.FC<Props> = ({ routes }) => {
    const [token] = useAccessTokenProvider();
    const [auth, setAuth] = useState<AuthProfile>();
    const [loading, setLoader] = useState<boolean>();
    const [error, setError] = useState<FormError>({
        message: '',
        path: undefined,
    });

    const history = useHistory();
    const [isMenuCollapsed, setMenuCollapsedState] = useState<boolean>(false);

    useEffect(() => {
        if (!token) {
            history.replace('/login');
        }

        AuthorisedUserProfileService({
            setAuth,
            setLoader,
            setError,
        }).then();

        if (error.path) {
            window.location.replace('/login');
        }
    }, [token]);

    if (loading) {
        return <LoaderComponent />;
    }

    return (
        <AuthContext.Provider value={auth}>
            <Layout>
                <SidebarComponent isMenuCollapsed={isMenuCollapsed} />
                <Layout className="site-layout">
                    <HeaderComponent isMenuCollapsed={isMenuCollapsed} setMenuState={setMenuCollapsedState} />
                    <Content
                        className="site-layout-background"
                        style={{
                            margin: '24px 16px',
                            padding: 24,
                            minHeight: 280,
                        }}
                    >
                        <Switch>
                            <Route exact path="/">
                                <Redirect to="/tasks" />
                            </Route>
                            {routes.map((route) => generateTitleRoute(route))}
                        </Switch>
                    </Content>
                </Layout>
            </Layout>
        </AuthContext.Provider>
    );
};

export default TemplateProvider;
