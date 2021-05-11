import React, { useEffect, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { Dropdown, Menu, Switch, Button, Spin } from "antd";
import {
    DownOutlined,
    UserOutlined,
    EditOutlined,
    FileOutlined,
    LogoutOutlined,
} from "@ant-design/icons";
import { useQuery } from "../hooks/useQuery";
import { CurrentUserContext } from "../reducers/currentUserContext";

const Header = (props) => {
    const { data, loading } = useQuery("user");
    const history = useHistory();
    const { title, theme, onChangeTheme } = props;
    const [currentUser, setCurrentUser] = useContext(CurrentUserContext);
    const logOut = () => {
        localStorage.removeItem("token");
        setCurrentUser(null);
        history.push("/login");
    };

    useEffect(() => {
        setCurrentUser({ ...data });
    }, [data]);

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
                {currentUser ? (
                    <Dropdown overlay={menu} trigger={["click"]}>
                        <Button onClick={(e) => e.preventDefault()}>
                            {loading ? (
                                <Spin size='small' />
                            ) : (
                                currentUser.username
                            )}
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
