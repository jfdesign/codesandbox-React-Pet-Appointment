import React from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.css";
import "./css/index.css";
import App from "./App";
import "jquery/dist/jquery.js";
import "popper.js/dist/umd/popper.js";
import "bootstrap/dist/js/bootstrap";

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
