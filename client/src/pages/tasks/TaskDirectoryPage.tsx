import { PlusCircleOutlined } from '@ant-design/icons';
import { Button, PageHeader } from 'antd';
import React, { useEffect, useState } from 'react';
import TaskDirectoryTable from './components/TaskDirectoryTable';
import TaskDrawerForm from './components/TaskDrawerForm';
import { Task } from './model/Task';
import TaskDirectoryService from './services/TaskDirectoryService';

const TaskDirectoryPage: React.FC = () => {
    const [isLoading, setLoader] = useState<boolean>(false);
    const [data, setData] = useState<Task[]>([]);
    const [isVisible, setVisible] = useState<boolean>(false);
    const toggleDrawer = () => setVisible(!isVisible);
    useEffect(() => {
        //= ==========================================
        // RETRIEVE TASKS
        //= ==========================================
        TaskDirectoryService({
            setLoader,
            setData,
        });
    }, []);

    //= ==========================================
    // PAGE BUILDER
    //= ==========================================

    console.log(data);
    return (
        <>
            <PageHeader
                className="site-page-header"
                title="Task Directory"
                extra={[
                    <Button
                        onClick={toggleDrawer}
                        key="1"
                        shape="round"
                        type="primary"
                        icon={<PlusCircleOutlined />}
                        size={'middle'}
                    >
                        Add
                    </Button>,
                ]}
            />

            <TaskDrawerForm isShow={isVisible} toggleDrawer={toggleDrawer} />
            <TaskDirectoryTable records={data} isLoading={isLoading} />
        </>
    );
};

export default TaskDirectoryPage;
