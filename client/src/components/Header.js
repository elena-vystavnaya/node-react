import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { Dropdown, Menu, Switch, Button } from "antd";
import axios from "axios";
import {
    DownOutlined,
    UserOutlined,
    EditOutlined,
    FileOutlined,
    LogoutOutlined,
} from "@ant-design/icons";

const Header = (props) => {
    const history = useHistory();
    const { title, theme, onChangeTheme } = props;
    const [user, setUser] = useState(null);

    const logOut = () => {
        localStorage.removeItem("token");
        setUser(null);
        history.push("/login");
    };

    const token = localStorage.getItem("token");
    useEffect(() => {
        async function fetchData() {
            if (token) {
                const response = await axios.get(
                    "http://localhost:8000/api/user"
                );
                if (response.data) {
                    setUser({
                        ...response.data,
                    });
                }
            }
        }
        fetchData();
    }, [token]);

    const menu = (
        <Menu>
            <Menu.Item key='/profile'>
                <Link to='/profile'>
                    <UserOutlined />
                    Profile
                </Link>
            </Menu.Item>
            <Menu.Item key='/edit-profile'>
                <Link to='/edit-profile'>
                    <EditOutlined />
                    Edit Profile
                </Link>
            </Menu.Item>
            <Menu.Item key='/files'>
                <Link to='/files'>
                    <FileOutlined />
                    Files
                </Link>
            </Menu.Item>
            <Menu.Divider />
            <Menu.Item danger={true} key='3' onClick={logOut}>
                <LogoutOutlined />
                Logout
            </Menu.Item>
        </Menu>
    );

    return (
        <>
            <h1>{title}</h1>
            <div>
                <Switch checked={theme} onChange={onChangeTheme} />
                {user ? (
                    <Dropdown overlay={menu} trigger={["click"]}>
                        <Button onClick={(e) => e.preventDefault()}>
                            {user.username}
                            <DownOutlined />
                        </Button>
                    </Dropdown>
                ) : (
                    <>
                        <Link to='/login'>Sign in</Link> |
                        <Link to='/register'>Sign up</Link>
                    </>
                )}
            </div>
        </>
    );
};

export default Header;
