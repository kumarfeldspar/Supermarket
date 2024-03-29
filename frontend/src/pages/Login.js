import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify"; // Import toast and ToastContainer
import "react-toastify/dist/ReactToastify.css";
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
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
    <>
      <div className="loginContainer">
        <h2>Login</h2> {/* "Login" text placed on top */}
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
      <ToastContainer /> {/* Place ToastContainer at top level */}
    </>
  );
}

export default Login;
