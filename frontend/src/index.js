import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import FrontendRoute from "./Routes/index";
import Login from "./Components/Login/Login";
import { ToastProvider } from "react-toast-notifications";

ReactDOM.render(
    <ToastProvider autoDismiss autoDismissTimeout={4000} placement="top-right">
      <FrontendRoute>
        <Login />
      </FrontendRoute>
    </ToastProvider>,
  document.getElementById("root")
);
