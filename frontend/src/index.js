import React from "react";
import ReactDOM from "react-dom";
import reportWebVitals from "./reportWebVitals";
//import "./assets/scss/main.scss";
import RootRoute from "./routes/RootRoute";
import './App.less';
ReactDOM.render(<RootRoute />, document.getElementById("root"));

reportWebVitals();
