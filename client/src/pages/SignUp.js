import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Form, Input, Button } from "antd";
import { usePost } from "../hooks/usePost";
import { validateMessages } from "../constants/validateMessages";
import { message } from "antd";

const SignUp = () => {
    let history = useHistory();
    const [user, setUser] = useState({
        username: null,
        email: null,
        password: null,
    });

    const postData = usePost("register");

    const OnFinish = async () => {
        const response = await postData({
            variables: {
                ...user,
            },
        });
        if (response) {
            message.success("User was created");
            localStorage.setItem("token", response.token);
            history.push("/");
        }
    };

    const onChangeField = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <Form
            onFinish={OnFinish}
            layout='vertical'
            validateMessages={validateMessages}>
            <Form.Item
                label='Username'
                name='username'
                value={user.username}
                onChange={onChangeField}
                rules={[{ required: true }]}>
                <Input name='username' />
            </Form.Item>

            <Form.Item
                label='Email'
                name='email'
                value={user.email}
                onChange={onChangeField}
                rules={[{ required: true, type: "email" }]}>
                <Input name='email' />
            </Form.Item>

            <Form.Item
                label='Password'
                name='password'
                value={user.password}
                onChange={onChangeField}
                rules={[
                    {
                        required: true,
                        min: 8,
                    },
                    {
                        pattern: /(?=.*\d)(?=.*[a-z])/,
                    },
                ]}>
                <Input.Password name='password' />
            </Form.Item>

            <Form.Item>
                <Button type='primary' htmlType='submit'>
                    Submit
                </Button>
            </Form.Item>
        </Form>
    );
};

export default SignUp;
