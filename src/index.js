import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "antd/dist/antd.css";
import "./web/css/style.scss";

ReactDOM.render(
    // <React.StrictMode> //return error after validation antd form 
    <App />,
    // </React.StrictMode>
    document.getElementById("root")
);
