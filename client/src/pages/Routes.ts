import { OrderedListOutlined, TeamOutlined } from '@ant-design/icons';
import LoginPage from './authentications/LoginPage';
import RegisterPage from './authentications/RegisterPage';
import TaskDetailsPage from './tasks/TaskDetailsPage';
import TaskDirectoryPage from './tasks/TaskDirectoryPage';
import UserDetailsPage from './users/UserDetailsPage';
import UserDirectoryPage from './users/UserDirectoryPage';

export interface RouteProps {
    title: string;
    description: string;
    path: string;
    component: React.FC;
    icon?: React.FC;
    sidebar?: boolean;
    scope?: string[];
}

enum AUTH_SCOPE {
    ADMINISTRATOR = 'administrator',
    CUSTOMER = 'customer',
}

export const FirstLetterCapitalize = (str: any): string => str.charAt(0).toUpperCase() + str.slice(1);

export const PUBLIC_ROUTES: RouteProps[] = [
    {
        title: 'Login',
        description: 'Enter your credential to get access.',
        path: '/login',
        component: LoginPage,
        scope: ['*'],
    },
    {
        title: 'Register',
        description: 'Enter your credential to get access.',
        path: '/register',
        component: RegisterPage,
        scope: ['*'],
    },
];

export const PRIVATE_ROUTES: RouteProps[] = [
    // {
    //     title: 'Home',
    //     description: 'Enter your credential to get access.',
    //     path: '/',
    //     component: HomePage,
    //     sidebar: true,

    //     scope: [AUTH_SCOPE.ADMINISTRATOR, AUTH_SCOPE.CUSTOMER],
    // },
    {
        title: 'Tasks',
        description: 'Enter your credential to get access.',
        path: '/tasks',
        component: TaskDirectoryPage,
        sidebar: true,
        icon: OrderedListOutlined,
        scope: [AUTH_SCOPE.ADMINISTRATOR, AUTH_SCOPE.CUSTOMER],
    },
    {
        title: 'Tasks Details',
        description: 'Enter your credential to get access.',
        path: '/tasks/:id',
        component: TaskDetailsPage,
        sidebar: false,
        scope: [AUTH_SCOPE.ADMINISTRATOR, AUTH_SCOPE.CUSTOMER],
    },
    {
        title: 'User',
        description: 'Enter your credential to get access.',
        path: '/users',
        component: UserDirectoryPage,
        sidebar: true,
        icon: TeamOutlined,
        scope: [AUTH_SCOPE.ADMINISTRATOR],
    },
    {
        title: 'User',
        description: 'Enter your credential to get access.',
        path: '/users/:id',
        component: UserDetailsPage,
        sidebar: false,

        scope: [AUTH_SCOPE.ADMINISTRATOR],
    },
];

export const SIDEBAR_ROUTES = () =>
    PRIVATE_ROUTES.filter(
        (route: any) => route.sidebar, // && route.scope.includes(role),
    );
