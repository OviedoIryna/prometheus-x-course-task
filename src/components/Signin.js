import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import avatar from "../images/avatar.png";
import "./signin.css";

function SignIn({ onSignIn }) {
  const [userName, setUsername] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const storedUsername = localStorage.getItem("userName");
    const storedIsAuthenticated = localStorage.getItem("isAuthenticated");

    if (storedUsername && storedIsAuthenticated) {
      setUsername(storedUsername);
      setIsAuthenticated(storedIsAuthenticated === "true");
      if (storedIsAuthenticated === "true") {
        navigate("/booklist");
      }
    }
  }, []);

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleSignIn = (event) => {
    event.preventDefault();
    if (userName.length >= 4 && userName.length <= 16) {
      localStorage.setItem("userName", userName);
      localStorage.setItem("isAuthenticated", "true");
      setIsAuthenticated(true);
      onSignIn(userName);
      navigate("/booklist");
    }
  };

  return (
    <main>
      <div id="mainContainer">
        <img src={avatar} alt="User avatar" id="imgAvatar" />
        <h2 id="labelUserName">Username</h2>
        <form onSubmit={handleSignIn}>
          <input
            type="text"
            id="userName"
            name="userName"
            placeholder="Type Username"
            value={userName}
            onChange={handleUsernameChange}
          />
          <button
            type="submit"
            id="signIn"
            disabled={userName.length < 4 || userName.length > 16}
          >
            Sign-In
          </button>
        </form>
      </div>
    </main>
  );
}

export default SignIn;
