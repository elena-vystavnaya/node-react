import React, { useState, useEffect, useContext } from "react";
import {
    Row,
    Col,
    Card,
    Avatar,
    Typography,
    Form,
    Button,
    message,
    Spin,
} from "antd";
import { UserOutlined, CameraOutlined } from "@ant-design/icons";
import { useQuery } from "../hooks/useQuery";
import { validateMessages } from "../constants/validateMessages";
import FormInput from "../components/reusable/FormInput";
import { usePost } from "../hooks/usePost";
import { BACKEND_IMAGES } from "../constants/urls";
import { CurrentUserContext } from "../reducers/currentUserContext";

const Profile = () => {
    const { data, loading, refetch } = useQuery("user");
    const [loadingAvatar, setLoadingAvatar] = useState(false);
    const [formData, setFormData] = useState({
        currentPassword: null,
        newPassword: null,
    });

    const postData = usePost("updateUser");
    const updateAvatar = usePost("updateAvatar");
    const [currentUser, setCurrentUser] = useContext(CurrentUserContext);
    
    useEffect(() => {
        setFormData({ ...data, ...formData });
        setLoadingAvatar(false);
    }, [data]);

    const OnFinish = async () => {
        if (
            (formData.newPassword && !formData.currentPassword) ||
            (!formData.newPassword && formData.currentPassword)
        ) {
            message.error("Enter the current password and new password");
        } else {
            const response = await postData({ variables: { ...formData } });

            if (response) {
                refetch();
                setCurrentUser(formData);
                message.success(response.message);
                setFormData({
                    ...formData,
                    currentPassword: null,
                    newPassword: null,
                });
            }
        }
    };

    const onChangeField = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleChangeAvatar = async (info) => {
        setLoadingAvatar(true);
        const file = info.target.files[0];
        const formDataFile = new FormData();
        formDataFile.append("avatar", file);
        try {
            const response = await updateAvatar({ variables: formDataFile });

            if (response) {
                message.success(response.message);
                refetch();
            }
        } catch (error) {
            console.log(error);
        }
    };

    return data ? (
        <Row gutter={16}>
            <Col span={8}>
                <Card className='card-user'>
                    {data.avatar && data.avatar.data && !loadingAvatar ? (
                        <Avatar
                            size={100}
                            src={BACKEND_IMAGES + data.avatar.data}
                        />
                    ) : loadingAvatar ? (
                        <Avatar size={100} icon={<Spin />} />
                    ) : (
                        <Avatar size={100} icon={<UserOutlined />} />
                    )}
                    <div className='upload-avatar'>
                        <input
                            type='file'
                            id='upload-avatar'
                            onChange={handleChangeAvatar}
                        />
                        <label htmlFor='upload-avatar'>
                            <CameraOutlined />
                        </label>
                    </div>
                    <Typography.Title level={2}>
                        {data.username}
                    </Typography.Title>
                </Card>
            </Col>
            <Col span={16}>
                <Card title='Account Details'>
                    {loading && !loadingAvatar ? (
                        <Spin />
                    ) : (
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
                                        rules={[
                                            { required: true, type: "email" },
                                        ]}
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
                    )}
                </Card>
            </Col>
        </Row>
    ) : null;
};

export default Profile;
