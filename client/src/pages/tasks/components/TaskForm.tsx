import { DeleteOutlined } from '@ant-design/icons';
import { Alert, Button, Checkbox, Form, Input, Popconfirm, Space } from 'antd';
import React, { useContext, useEffect } from 'react';
import { useState } from 'react';
import { AuthContext } from '../../../providers/AuthContext';
import { FormError } from '../../../providers/FormProvider';
import { Task } from '../model/Task';
import { TaskInput } from '../model/TaskInput';
import RemoveTaskService from '../services/RemoveTaskService';
import UpdateTaskDetailsService from '../services/UpdateTaskService';

interface Props {
    readonly: boolean;
    task: Task | undefined;
}

const TaskForm: React.FC<Props> = ({ task }) => {
    const layout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 0 },
    };
    const [isEdit, setTaskExist] = useState<boolean>(false);
    const [formValues, setFormValues] = useState<TaskInput>({
        id: task?.id,
        description: task?.description ? task?.description : '',
        title: task?.title ? task?.title : '',
        isComplete: task?.isComplete ? task?.isComplete : false,
    });

    const [success, setSuccess] = useState({
        message: '',
        data: 0,
    });
    const [isLoading, setLoader] = useState<boolean>(false);

    const [{ message, path }, setError] = useState<FormError>({
        message: '',
        path: undefined,
    });

    const user = useContext(AuthContext);
    const [form] = Form.useForm();
    useEffect(() => {
        if (task) {
            const { id, description, title, isComplete } = task;
            setTaskExist(user?.id == task.user.id);
            const value = { id, description, title, isComplete };
            setFormValues(value);
            form.setFieldsValue(value);
        }
    }, [isEdit, task, form, success]);

    const onCheckboxChange = (event: any) => {
        const { name, checked } = event.target;
        setFormValues((prevState) => ({
            ...prevState,
            [name]: checked,
        }));
    };

    const onInputChangeHandler = (event: any) => {
        const { id, value } = event.target;
        setFormValues((prevState) => ({
            ...prevState,
            [id]: value,
        }));
    };

    const onSubmit = () => {
        if (formValues.id) {
            // update
            UpdateTaskDetailsService({
                setData: setSuccess,
                setError,
                setLoader,
                values: formValues,
            });
        } else {
        }
    };

    const onDelete = () => {
        RemoveTaskService({
            setData: setSuccess,
            setError,
            setLoader,
            values: formValues,
        });
    };

    return (
        <>
            {success.data ? <Alert message="" description={success.message} type="success" banner showIcon /> : ''}
            {path ? (
                <div style={{ paddingBottom: '20px' }}>
                    <Alert message="Error" description={message} type="error" banner showIcon />
                </div>
            ) : (
                ''
            )}
            <Form
                {...layout}
                // layout="horizontal"
                size="middle"
                form={form}
                name="task-form"
                onFinish={onSubmit}
            >
                <Form.Item
                    labelCol={{ span: 24 }}
                    // style={{ paddingBottom: path?.email ? '20px' : '0' }}
                    validateStatus={path?.title ? 'error' : ''}
                    help={path?.title ? path.title : ''}
                    label="Title"
                    name="title"
                    initialValue={formValues.title}
                    rules={[{ required: true, message: 'Title is Required' }]}
                >
                    <Input
                        id="title"
                        onChange={onInputChangeHandler}
                        placeholder="Title"
                        disabled={!isEdit}
                        bordered={isEdit}
                    />
                </Form.Item>
                <Form.Item
                    labelCol={{ span: 24 }}
                    // style={{ paddingBottom: path?.email ? '20px' : '0' }}
                    validateStatus={path?.description ? 'error' : ''}
                    help={path?.description ? path.description : ''}
                    initialValue={formValues.description}
                    label="Description"
                    name="description"
                    rules={[{ required: true, message: 'Description is Required' }]}
                >
                    <Input.TextArea
                        id="description"
                        onChange={onInputChangeHandler}
                        disabled={!isEdit}
                        bordered={isEdit}
                        placeholder="Description"
                    />
                </Form.Item>
                <Form.Item name="isComplete" initialValue={formValues.isComplete}>
                    <Checkbox
                        name="isComplete"
                        onChange={onCheckboxChange}
                        checked={formValues.isComplete}
                        disabled={!isEdit}
                    >
                        Complete
                    </Checkbox>
                </Form.Item>

                {!isEdit ? (
                    ''
                ) : (
                    <Form.Item style={{ paddingTop: '20px', float: 'right' }}>
                        <Space size={20}>
                            <Popconfirm
                                title="Are you sure to delete this task?"
                                onConfirm={onDelete}
                                okText="Yes"
                                cancelText="No"
                            >
                                <Button
                                    key="1"
                                    shape="round"
                                    type="primary"
                                    danger
                                    icon={<DeleteOutlined />}
                                    size={'middle'}
                                >
                                    Delete
                                </Button>
                            </Popconfirm>

                            <Button loading={isLoading} shape="round" htmlType="submit" type="primary" size={'middle'}>
                                Submit
                            </Button>
                        </Space>
                    </Form.Item>
                )}
            </Form>
        </>
    );
};

export default TaskForm;
