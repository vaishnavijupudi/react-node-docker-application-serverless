import React, {  useState } from "react";
import axios from "axios";
import "../../App.css";
import { useToasts } from 'react-toast-notifications';
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";

export default function Registration() {
    const [nameReg, setNameReg] = useState("");
    const [passwordReg, setPasswordReg] = useState("");
    const [emailReg, setEmailReg] = useState("");
    const [genderReg, setgenderReg] = useState("M");
    const [toRedirect, setRedirect] = useState(false);
    const { addToast } = useToasts();

    // axios.defaults.withCredentials = true;
    const validateData = () => {
      console.log(nameReg, passwordReg, emailReg)
      if(nameReg && passwordReg && emailReg) {
        registeration();
      } else {
        addToast("Please enter all details", {
          appearance: 'error',
          autoDismiss: true,
        });
      }
    }

    const registeration = () => {
      
        var data = {
            name: nameReg,
            password: passwordReg,
            email: emailReg,
            gender: genderReg
        };

        axios.post("https://registration-buy4rf75xq-uc.a.run.app/registeration",data,{
          headers: {
              "Access-Control-Allow-Origin": "*",
              "Access-Control-Allow-Credentials": true,
          },
      }).then((response) => {
          console.log(response);
          if(response !== undefined) {
            addToast("Registration Successful", {
              appearance: 'success',
              autoDismiss: true,
            });
            setTimeout(
              () => setRedirect(true), 
              3000
            );
          } else {
            addToast("Registration Failed", {
              appearance: 'error',
              autoDismiss: true,
            });
          }
        });
      };

      if (toRedirect) {
        return (
          <Redirect 
            to={{
              pathname: "/login",
            }}
          />
        );
      } else {
        return(
          <div className="p-4">
            <h2>Registration</h2>
              <div className="mt-4 mb-4 w-50">
                <label>Name:</label>
                  <input className="form-control" type="text" onChange={(e) => {
                      setNameReg(e.target.value);
                    }} />
              </div>
              
                <div className="mt-4 mb-4 w-50">
                  <label>Email:</label>
                  <div>
                    <input className="form-control" type="email" onChange={(e) => {
                        setEmailReg(e.target.value);
                      }} />
                  </div>                  
                </div>
              
              <div className="mt-4 mb-4 w-50">
                <label>Password:</label>
                <div>
                  <input className="form-control" type="password"  onChange={(e) => {
                      setPasswordReg(e.target.value);
                    }}/>
                </div>
              </div>
              
              <div className="mt-4 mb-4 w-50">
                <label>Gender:</label>
                <div className="mb-4">
                  <select className="form-select" value={genderReg} onChange={(e) => {
                      setgenderReg(e.target.value);
                    }} >
                    <option value="M">Male</option>
                    <option value="F">Female</option>
                    <option value="O">Others</option>
                  </select>
                </div>
              </div>
              
              
              <div>
                <button className="btn btn-primary"  type="button" onClick={validateData}>Register</button>
              </div>
          </div>
      )
      }

    
}