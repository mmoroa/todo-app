import { Table, Tag, Typography } from 'antd';
import Text from 'antd/lib/typography/Text';
import React from 'react';
import { Task } from '../model/Task';

interface Data {
    records: Task[] | undefined;
    isLoading: boolean;
}
const TaskDirectoryTable: React.FC<Data> = ({ records, isLoading }) => {
    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            render: function link(text: number) {
                return <Typography.Link href={`/tasks/${text}`}>{text}</Typography.Link>;
            },
        },
        {
            title: 'TITLE',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: 'DESCRIPTION',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: 'COMPLETE',
            algin: 'center',
            dataIndex: 'isComplete',
            key: 'isComplete',
            render: function badge(text: string, _data: any, index: number) {
                return (
                    <Tag color={text ? 'geekblue' : 'green'} key={`isComplete-${index}`}>
                        {text ? 'Yes' : 'No'.toUpperCase()}
                    </Tag>
                );
            },
        },
        {
            title: 'AUTHOR',
            algin: 'center',
            dataIndex: 'user',
            key: 'user',
            render: function badge(text: any) {
                return <Text>{text.username}</Text>;
            },
        },
        {
            title: 'CREATED AT',
            algin: 'center',
            dataIndex: 'createdAt',
            key: 'createdAt',
        },
    ];

    return (
        <Table
            dataSource={records}
            loading={isLoading}
            bordered
            pagination={{ position: ['bottomCenter'] }}
            columns={columns}
            rowKey="id"
        />
    );
};

export default TaskDirectoryTable;
