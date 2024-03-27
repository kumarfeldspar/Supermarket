import React, { useState } from "react";
import axios from "axios";
import "./Login.css"; // Import the CSS file

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:5000/login", {
        //will send the data to backend and get the response
        email,
        password,
      });
      console.log("login successful");
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("type", response.data.type);
      //token saved in local storage
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="loginContainer">
      <div className="loginBox">
        <input
          className="loginInput"
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="loginInput"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="loginButton" onClick={handleLogin}>
          Login
        </button>
      </div>
    </div>
  );
}

export default Login;
