import { OrderedListOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { Avatar, Button, Descriptions, List, PageHeader, Skeleton } from 'antd';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import TaskDrawerForm from '../tasks/components/TaskDrawerForm';
import { User } from './model/User';
import UserDetailsService from './services/UserDetailsService';

const UserDetailsPage: React.FC = () => {
    const history = useHistory();
    const params: any = useParams();
    const [isLoading, setLoader] = useState<boolean>(false);
    const [data, setData] = useState<User>();
    const [isVisible, setVisible] = useState<boolean>(false);
    const toggleDrawer = () => setVisible(!isVisible);
    useEffect(() => {
        //= ==========================================
        // RETRIEVE TASKS
        //= ==========================================
        UserDetailsService({
            setLoader,
            setData,
            values: params['id'],
        });
    }, [isLoading]);

    console.log(data);
    return (
        <>
            <PageHeader className="site-page-header" onBack={() => history.goBack()} title="User Info"></PageHeader>

            <Descriptions column={24} layout={'vertical'} size={'middle'} title="" bordered>
                <Descriptions.Item label="UserName">{data?.username}</Descriptions.Item>
                <Descriptions.Item label="Email Address">{data?.email}</Descriptions.Item>
                <Descriptions.Item label="Role">{data?.role}</Descriptions.Item>
            </Descriptions>

            <PageHeader
                className="site-page-header"
                title="Tasks"
                extra={[
                    <Button onClick={toggleDrawer} key="1" type="link" icon={<PlusCircleOutlined />} size={'middle'}>
                        Add
                    </Button>,
                ]}
            />

            <TaskDrawerForm isShow={isVisible} toggleDrawer={toggleDrawer} />
            {data?.tasks ? (
                <List
                    dataSource={data?.tasks}
                    bordered
                    renderItem={(item) => (
                        <List.Item
                            key={item.id}
                            actions={[
                                <Link to={`/tasks/${item.id}`} key={`a-${item.id}`}>
                                    View
                                </Link>,
                            ]}
                        >
                            <Skeleton loading={isLoading} active avatar>
                                <List.Item.Meta
                                    avatar={<Avatar icon={<OrderedListOutlined />} />}
                                    title={<Link to={`/tasks/${item.id}`}>{item.title}</Link>}
                                    description={item.description}
                                />
                            </Skeleton>
                        </List.Item>
                    )}
                />
            ) : (
                ''
            )}
        </>
    );
};

export default UserDetailsPage;
