import React, { useEffect } from 'react';
import { RouteProps } from '../pages/Routes';
import { Route } from 'react-router-dom';

const APP_NAME = 'TODO';
export default function useDocumentTitle(title: string) {
    useEffect(() => {
        if (document && document.title) {
            if (title !== document.title) {
                document.title = title ? `${title} - ${APP_NAME}` : APP_NAME;
            }
        }
    }, [title]);
}

export function generateTitleRoute(route: RouteProps) {
    return (
        <Route key={route.path} path={route.path} exact>
            <TitleInjector title={route.title}>
                <route.component />
            </TitleInjector>
        </Route>
    );
}

type Props = {
    title: string;
};

const TitleInjector: React.FC<React.PropsWithChildren<Props>> = ({
    title,
    children,
}: React.PropsWithChildren<Props>) => {
    useDocumentTitle(title);
    return <>{children}</>;
};
