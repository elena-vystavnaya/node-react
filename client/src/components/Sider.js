import React from "react";
import { NavLink, useHistory } from "react-router-dom";
import { Menu } from "antd";

const Sider = (props) => {
    const { routes } = props;
    const history = useHistory();
    return (
        <Menu
            theme={props.theme ? "light" : "dark"}
            defaultSelectedKeys={[history.location.pathname]}
            mode='inline'>
            {routes &&
                routes.map((item) => {
                    return (
                        <Menu.Item key={item.path}>
                            <NavLink to={item.path}>{item.title}</NavLink>
                        </Menu.Item>
                    );
                })}
        </Menu>
    );
};

export default Sider;
