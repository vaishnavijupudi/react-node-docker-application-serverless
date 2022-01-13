import React, { useState } from "react";
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";
import axios from "axios";

export default function Home(props) {

    const [isRedirect, setRedirect] = useState(false);
    const [errMsg, setErrMsg] = useState("");
    const [userList, setUserList] = useState([]);

    //calling logout 
    const logout = () => {

        var data = {
            email: props.location.state.email
        }
        //sending data to logout function of node 
        axios.post("https://users-buy4rf75xq-uc.a.run.app/logout", data, {
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Credentials": true,
            },
        }).then((response) => {
            setRedirect(true);
        });
    }

    //calling get users 
    const users = () => {

        //sending data to users function of node
		var data = {
            email: props.location.state.email
        }
        axios.post("http://localhost:9002/users",data, {
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Credentials": true,
            },
        }).then((res) => {
            console.log("print user");
            console.log(res.data.users);
            setUserList(res.data.users);
            if (res.data.message === "Other users are offline") {
                setErrMsg("Other users are offline");
            } else {
                setErrMsg("");
            }
        }).catch((err) => { console.log(err.data); console.log("errrrrrr"); });
    };
    if (isRedirect) {
        return (
            <Redirect
                to={{
                    pathname: "/login",
                }}
            />
        );
    } else {
        return (
            <div className="p-5">
                <h1>Home Page</h1>
                <div className="home d-flex justify-content-between pt-4">
                    <div>
                        <h3>Hi {props.location.state.name}. You are logged in and Online</h3>
                        <h5>Email: {props.location.state.email}</h5>
                    </div>
                    <div>
                        <button type="submit" className="btn btn-dark" onClick={logout}>Log Out</button>
                    </div>
                </div>
                <div className="mt-5">
                    <div>
                        <div className="users">
                            <button
                                type="submit"
                                className="btn btn-primary"
                                onClick={users}
                            >
                                Get Users who are Online
                            </button>
                        </div>
                        {errMsg && (
                            <div className="error" role="alert">
                                {errMsg}
                            </div>
                        )}
                    </div>
                    {userList.length > 0 && (
                            <ul className="list-group w-50 mt-2">
                                {userList.map(x => (
                                    <li className="list-group-item">{x.name}</li>
                                ))}
                            </ul>
                        )}
                </div>
            </div>
        )
    }
}
