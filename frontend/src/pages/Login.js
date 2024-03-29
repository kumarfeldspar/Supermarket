import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify"; // Import toast
import "react-toastify/dist/ReactToastify.css";
import "./Login.css";
import logo from "../img/logo.png";
import { Link } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    try {
      const response = await axios.post("http://localhost:5000/login", {
        email,
        password,
      });

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("type", response.data.type);

      switch (response.data.type) {
        case "manager":
          window.location.href = "/manager"; // Redirect to manager route
          break;
        case "employee":
          window.location.href = "/employee"; // Redirect to employee route
          break;
        case "clerk":
          window.location.href = "/clerk"; // Redirect to clerk route
          break;
        default:
          console.log("Unknown user type");
      }

      // Show success toast message
      toast.success("Login successful!");
    } catch (error) {
      // Show error toast message
      toast.error("Login failed. Please check your credentials.");
      console.log(error);
    }
  };

  return (
    <div className="signIn">
      <ToastContainer />
      <div>
        <form className="loginForm" onSubmit={handleLogin}>
          {/* Wrap with form tag and set onSubmit to handleLogin */}
          <img className="signUpLogo" src={logo} alt="" />
          <div>
            <input
              type="email"
              name="email"
              id="email"
              value={email}
              placeholder="Email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
          <div>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
          <input
            type="submit"
            id="login-btn"
            onClick={(e) => {
              handleLogin(e);
            }}
            value="Sign In"
          />
        </form>
        {/* <div className="loginForm2">
          Don't have an account ?
          <Link to="/signup">
            <span style={{ color: "blue", cursor: "pointer" }}>Sign Up</span>
          </Link>
        </div> */}
      </div>
    </div>
  );
}

export default Login;
