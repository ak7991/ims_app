import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { useHistory } from "react-router-dom";

import LoginPageRedirect from "../pages/LoginRedirect";
import Incident from "../incident/Incident";


const Home = () => {
  const [loggedInStatus, setLoggedInStatus] = useState([]);
  const [greeting, setGreeting] = useState("");
  const [logUser, ] = useCookies(["fname"]);
  const [token] = useCookies(["loginToken"]);
  const [ , , removeCookie] = useCookies(["loginToken"]);

  let history = useHistory();

  useEffect(() => {
    if (token && token["loginToken"]) {
      setLoggedInStatus(true);
      setGreeting(`Hello, `)
    } else {
      setLoggedInStatus(false);
    }
  });

  const logout = () => {
    setLoggedInStatus(false);
    removeCookie("loginToken");
    history.push("/");
    history.go("/");
  };


  const loggedInContent = () => {
    return (
      <div className="container" style={{ padding: "0 0 5em" }}>
      <div
        className="header text-white d-flex align-items-center justify-content-between"
        style={{ marginTop: "5em" }}
      >
        <div className="text-wrapper">
          <h1>{greeting} {logUser["fname"]}</h1>
        </div>
        <div className="logout-wrapper">
          <button onClick={logout} className="btn btn-primary">
            Logout
          </button>
        </div>
      </div>
      <Incident />
    </div>
    );
  };

  return loggedInStatus ? loggedInContent() : LoginPageRedirect()
    
};

export default Home;