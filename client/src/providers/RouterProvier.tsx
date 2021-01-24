import React from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';
import { PRIVATE_ROUTES, PUBLIC_ROUTES } from '../pages/Routes';
import { generateTitleRoute } from './PageTitleProvider';
import TemplateProvider from './TemplateProvider';

const publicRoutes = PUBLIC_ROUTES.map((route) => generateTitleRoute(route));
const protectedRoutes = <TemplateProvider routes={PRIVATE_ROUTES} />;

const RouterProvider: React.FC = () => {
    return (
        <BrowserRouter>
            <Switch>
                {publicRoutes}
                {protectedRoutes}
            </Switch>
        </BrowserRouter>
    );
};

export default RouterProvider;
