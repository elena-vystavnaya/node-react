import React, { useState } from "react";
import { Form, Input, Button } from "antd";
import { usePost } from "../hooks/usePost";
import { validateMessages } from "../constants/validateMessages";
import { useHistory } from "react-router-dom";

const SignIn = () => {
    const history = useHistory();
    const [user, setUser] = useState({
        email: null,
        password: null,
    });

    const postData = usePost("login");

    const OnFinish = async () => {
        const response = await postData({
            variables: {
                ...user,
            },
        });
        if (response) {
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
                        message: "Please input your password!",
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

export default SignIn;
