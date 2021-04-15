import React, { useEffect } from "react";
import { Route, useHistory } from "react-router-dom";
import { Page } from "../components/Page";
import ErrorBoundary from "./ErrorBoundary";
import axios from "axios";

export const PrivateRoute = ({ component, ...rest }) => {
    const history = useHistory();
    useEffect(() => {
        async function verifyToken() {
            try {
                await axios.get("http://localhost:8000/api/verifyToken", {
                    token: localStorage.getItem("token"),
                });
            } catch (error) {
                history.push("/login");
            }
        }
        verifyToken();
    }, [history]);

    return (
        <Route
            {...rest}
            render={(props) => (
                <ErrorBoundary>
                    <Page
                        setTitle={rest.setTitle}
                        title={rest.title}
                        {...props}>
                        {component}
                    </Page>{" "}
                </ErrorBoundary>
            )}
        />
    );
};
