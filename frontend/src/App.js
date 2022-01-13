import React from "react";
import "./App.css";
import { ToastProvider } from "react-toast-notifications";

function App(props) {
  return (
  <div className="app">
    {props.children}
  </div>
  );
}

export default App;
