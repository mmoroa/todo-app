import { UserOutlined } from '@ant-design/icons';
import { Avatar, List, PageHeader, Skeleton } from 'antd';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { User } from './model/User';
import UserDirectoryService from './services/UserDirectoryService';

// const DescriptionItem = ({ title, content }) => (
//     <div className="site-description-item-profile-wrapper">
//         <p className="site-description-item-profile-p-label">{title}:</p>
//         {content}
//     </div>
// );

const UserDirectoryPage: React.FC = () => {
    const [isLoading, setLoader] = useState<boolean>(false);
    const [data, setData] = useState<User[]>([]);

    useEffect(() => {
        //= ==========================================
        // RETRIEVE TASKS
        //= ==========================================
        UserDirectoryService({
            setLoader,
            setData,
        });
    }, []);

    //= ==========================================
    // PAGE BUILDER
    //= ==========================================
    return (
        <>
            <PageHeader className="site-page-header" title="Users Directory" />

            <List
                dataSource={data}
                bordered
                renderItem={(item) => (
                    <List.Item
                        key={item.id}
                        actions={[
                            <Link to={`/users/${item.id}`} key={`a-${item.id}`}>
                                View Profile
                            </Link>,
                        ]}
                    >
                        <Skeleton loading={isLoading} active avatar>
                            <List.Item.Meta
                                avatar={<Avatar icon={<UserOutlined />} />}
                                title={<Link to={`/users/${item.id}`}>{item.username}</Link>}
                                description={item.email}
                            />
                        </Skeleton>
                    </List.Item>
                )}
            />
        </>
    );
};

export default UserDirectoryPage;
