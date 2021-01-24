import { Card, PageHeader } from 'antd';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import TaskForm from './components/TaskForm';
import { Task } from './model/Task';
import TaskDetailsService from './services/TaskDetailsService';

const TaskDetailsPage: React.FC = () => {
    const history = useHistory();
    const params: any = useParams();
    const [isLoading, setLoader] = useState<boolean>(false);
    const [data, setData] = useState<Task>();

    useEffect(() => {
        //= ==========================================
        // RETRIEVE TASKS
        //= ==========================================
        TaskDetailsService({
            setLoader,
            setData,
            values: params['id'],
        });
    }, [isLoading]);

    return (
        <>
            <PageHeader className="site-page-header" onBack={() => history.goBack()} title="Task" />
            <div style={{ padding: '20px 0' }}></div>
            <Card loading={isLoading}>
                <TaskForm readonly={true} task={data} />
            </Card>
        </>
    );
};

export default TaskDetailsPage;
