import React, { useState, useEffect } from "react";
import {
    Row,
    Col,
    Card,
    Spin,
    Avatar,
    Typography,
    Form,
    Button,
    message,
} from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useQuery } from "../hooks/useQuery";
import { validateMessages } from "../constants/validateMessages";
import FormInput from "../components/reusable/FormInput";
import { usePost } from "../hooks/usePost";

const Profile = () => {
    const { data, loading, refetch } = useQuery("user");
    const [formData, setFormData] = useState({
        currentPassword: null,
        newPassword: null,
    });

    const postData = usePost("updateUser");

    useEffect(() => {
        setFormData({ ...data, ...formData });
    }, [data]);


    const OnFinish = async () => {
        if (
            (formData.newPassword && !formData.currentPassword) ||
            (!formData.newPassword && formData.currentPassword)
        ) {
            message.error("Enter the current password and new password");
        } else {
            const response = await postData({ variables: { ...formData } });
            // if (response.success) {
            //     refetch();
            //     message.success(response.message);
            //     setFormData({
            //         ...formData,
            //         currentPassword: null,
            //         newPassword: null,
            //     });
            // } else {
            //     message.error(response.message);
            // }
        }
    };

    const onChangeField = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    if (loading) {
        return <Spin />;
    }

    return data ? (
        <Row gutter={16}>
            <Col span={8}>
                <Card className='card-user'>
                    <Avatar size={100} icon={<UserOutlined />} />
                    <Typography.Title level={2}>
                        {data.username}
                    </Typography.Title>
                </Card>
            </Col>
            <Col span={16}>
                <Card title='Account Details'>
                    <Form
                        layout='vertical'
                        onFinish={OnFinish}
                        validateMessages={validateMessages}>
                        <Row gutter={16}>
                            <Col span={12}>
                                <FormInput
                                    label='Name'
                                    type='text'
                                    name='username'
                                    value={formData.username}
                                    onChange={onChangeField}
                                    rules={[{ required: true }]}
                                />
                            </Col>
                            <Col span={12}>
                                <FormInput
                                    label='Email'
                                    type='email'
                                    name='email'
                                    value={formData.email}
                                    onChange={onChangeField}
                                    rules={[{ required: true, type: "email" }]}
                                />
                            </Col>
                            <Col span={12}>
                                <FormInput
                                    label='New Password'
                                    type='password'
                                    name='newPassword'
                                    value={formData.newPassword}
                                    onChange={onChangeField}
                                    rules={[
                                        {
                                            min: 8,
                                        },
                                        {
                                            pattern: /(?=.*\d)(?=.*[a-z])/,
                                        },
                                    ]}
                                />
                            </Col>
                            <Col span={12}>
                                <FormInput
                                    label='Current Password'
                                    type='password'
                                    name='currentPassword'
                                    value={formData.currentPassword}
                                    onChange={onChangeField}
                                />
                            </Col>
                        </Row>
                        <Button type='primary' htmlType='submit'>
                            Update Account
                        </Button>
                    </Form>
                </Card>
            </Col>
        </Row>
    ) : null;
};

export default Profile;
