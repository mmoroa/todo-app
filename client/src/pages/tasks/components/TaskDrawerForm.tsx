import { Alert, Button, Checkbox, Drawer, Form, Input } from 'antd';
import React from 'react';
import { useState } from 'react';
import { FormError } from '../../../providers/FormProvider';
import { TaskInput } from '../model/TaskInput';
import AddTaskService from '../services/AddTaskService';

interface Props {
    toggleDrawer: any;
    isShow: boolean;
}

const TaskDrawerForm: React.FC<Props> = ({ toggleDrawer, isShow }) => {
    const layout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 0 },
    };

    const [formValues, setFormValues] = useState<TaskInput>({
        description: '',
        title: '',
        isComplete: false,
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

    const [form] = Form.useForm();

    const onInputChangeHandler = (event: any) => {
        const { id, value } = event.target;
        setFormValues((prevState) => ({
            ...prevState,
            [id]: value,
        }));
    };

    const onSubmit = () => {
        const isFormValid = form.getFieldsError().some((item) => item.errors.length > 0);
        const errMsg = 'We are unable to process your request. Please check your entry and try again.';
        setError({
            message: '',
            path: undefined,
        });
        if (form.getFieldError('title').length && form.getFieldError('description').length) {
            setError({
                message: errMsg,
                path: {
                    title: form.getFieldError('title')[0],
                    description: form.getFieldError('description')[0],
                },
            });
        } else if (form.getFieldError('title').length) {
            setError({
                message: errMsg,
                path: {
                    title: form.getFieldError('title')[0],
                },
            });
        } else if (form.getFieldError('description').length) {
            setError({
                message: errMsg,
                path: {
                    description: form.getFieldError('description')[0],
                },
            });
        }

        if (!isFormValid) {
            AddTaskService({
                setData: setSuccess,
                setError,
                setLoader,
                values: formValues,
            });
        }
    };

    const onCheckboxChange = (event: any) => {
        const { name, checked } = event.target;
        setFormValues((prevState) => ({
            ...prevState,
            [name]: checked,
        }));
    };

    return (
        <>
            <Drawer
                title="Create a new task"
                width={720}
                visible={isShow}
                bodyStyle={{ paddingBottom: 80 }}
                onClose={toggleDrawer}
            >
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
                        <Input id="title" onChange={onInputChangeHandler} placeholder="Title" />
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
                        <Input.TextArea id="description" onChange={onInputChangeHandler} placeholder="Description" />
                    </Form.Item>
                    <Form.Item name="isComplete" initialValue={formValues.isComplete}>
                        <Checkbox name="isComplete" onChange={onCheckboxChange} checked={formValues.isComplete}>
                            Complete
                        </Checkbox>
                    </Form.Item>

                    <Form.Item style={{ paddingTop: '20px', float: 'right', textAlign: 'right' }}>
                        <Button onClick={toggleDrawer} shape="round" style={{ marginRight: 8 }}>
                            Cancel
                        </Button>
                        <Button loading={isLoading} shape="round" htmlType="submit" type="primary" size={'middle'}>
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </Drawer>
        </>
    );
};

export default TaskDrawerForm;
