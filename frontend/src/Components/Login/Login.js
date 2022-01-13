import React, { useState } from "react";
import axios from "axios";
import "../../App.css";
import { useToasts } from 'react-toast-notifications';
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";

export default function Login() {

  const [emailLog, setEmailLog] = useState("");
  const [passwordLog, setPasswordLog] = useState("");
  const [toRedirect, setRedirect] = useState(false);
  const [formData, setFormData] = useState({});
  const { addToast } = useToasts();

  const login = () => {
    var data = {
      email: emailLog,
      password: passwordLog,
    };
    //call to login function in node
    axios.post("https://login-buy4rf75xq-uc.a.run.app/login", data).then((response) => {
      if (response.data.message !== "login sucessful") {
        addToast("login Failed", {
          appearance: 'error',
          autoDismiss: true,
        });
      } else {
        setFormData({ ...response.data });
        addToast("Login Successful", {
          appearance: 'success',
          autoDismiss: true,
        });
        setTimeout(
          () => setRedirect(true),
          3000
        );
      }
    });
  };

  if (toRedirect) {
    return (
      <Redirect
        to={{
          pathname: "/home",
          state: { ...formData },
        }}
      />
    );
  } else {
    return (
      <div className="p-5">
        <h2>Login</h2>
        <div className="mt-4 mb-4 w-50">
          <label>Email:</label>
          <div>
            <input className="form-control" type="email" onChange={(e) => {
              setEmailLog(e.target.value);
            }} />
          </div>
        </div>
        <div className="mt-4 mb-4 w-50">
          <label>Password:</label>
          <div className="form-group">
            <input className="form-control" type="password" onChange={(e) => {
              setPasswordLog(e.target.value);
            }} />
          </div>
        </div>
        <div>
          <button type="submit" className="btn btn-primary" onClick={login}>Login</button>
        </div>
      </div>
    )
  }

}