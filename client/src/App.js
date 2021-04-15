import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import axios from "axios";
import { Layout } from "antd";

import Header from "./components/Header";
import Sider from "./components/Sider";

import About from "./pages/About";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import { Page } from "./components/Page";

import { Provider } from "react-redux";
import { createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "./reducers";
import ErrorBoundary from "./utils/ErrorBoundary";
import { PrivateRoute } from "./utils/PrivateRoute";

import { useChat } from "./hooks/useChat";

const store = createStore(rootReducer, composeWithDevTools());

// store.subscribe();
const App = () => {
    const [title, setTitle] = useState("");
    const [theme, setTheme] = useState(true);
    const { users } = useChat("room");

    const onChangeTheme = () => {
        setTheme(!theme);
    };
    const dinamicRoutes = [
        {
            component: <Home />,
            path: "/",
            title: "Home",
            exact: true,
        },
        {
            component: <Profile />,
            path: "/profile",
            title: "Profile",
        },
        {
            component: <About users={users} />,
            path: "/about",
            title: "About",
        },
    ];
    const staticRoutes = [
        {
            component: <SignUp />,
            path: "/register",
            title: "Sign up",
        },
        {
            component: <SignIn />,
            path: "/login",
            title: "Sign in",
        },
    ];

    axios.interceptors.request.use(function (config) {
        const token = localStorage.getItem("token");
        config.headers.Authorization = `Bearer ${token}`;
        return config;
    });

    return (
        <Provider store={store}>
            <Router>
                <Layout className={theme ? "light" : "dark"}>
                    <Layout.Sider breakpoint='xxl'>
                        <Sider theme={theme} routes={dinamicRoutes} />
                    </Layout.Sider>
                    <Layout className={theme ? "light" : "dark"}>
                        <Layout.Header>
                            <Header
                                title={title}
                                theme={theme}
                                onChangeTheme={onChangeTheme}
                            />
                        </Layout.Header>

                        <Layout.Content>
                            <Switch>
                                {staticRoutes.map((item, index) => {
                                    return (
                                        <Route
                                            key={index}
                                            path={item.path}
                                            title={item.title}
                                            exact={item.exact}>
                                            <ErrorBoundary>
                                                <Page
                                                    setTitle={setTitle}
                                                    title={item.title}>
                                                    {item.component}
                                                </Page>
                                            </ErrorBoundary>
                                        </Route>
                                    );
                                })}
                                {dinamicRoutes.map((item, index) => {
                                    return (
                                        <PrivateRoute
                                            key={index}
                                            path={item.path}
                                            title={item.title}
                                            exact={item.exact}
                                            setTitle={setTitle}
                                            component={item.component}
                                        />
                                    );
                                })}
                            </Switch>
                        </Layout.Content>
                        <Layout.Footer>Footer</Layout.Footer>
                    </Layout>
                </Layout>
            </Router>
        </Provider>
    );
};

export default App;
