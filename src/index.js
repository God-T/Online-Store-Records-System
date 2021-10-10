import React from "react";
import { render } from "react-dom";
import { App } from "./App";
import { HashRouter } from "react-router-dom";
import "font-awesome/css/font-awesome.css";
import "./index.css";

render(
    <HashRouter>
        <App />
    </HashRouter>,
    document.getElementById("root")
);
