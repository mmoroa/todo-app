import { PageHeader } from 'antd';
import React from 'react';
import TaskDirectoryPage from '../tasks/TaskDirectoryPage';

const HomePage: React.FC = () => {
    //= ==========================================
    // FORM BUILDER
    //= ==========================================
    return (
        <>
            <PageHeader className="site-page-header" title="Task Directory" />
            <TaskDirectoryPage />
        </>
    );
};

export default HomePage;
