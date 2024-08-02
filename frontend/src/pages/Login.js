import React, { useState, useContext } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify"; // Import toast
import "react-toastify/dist/ReactToastify.css";
import "./Login.css";
import logo from "../img/logo.png";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../context/GlobalContext";

function Login() {
  const { login } = useContext(GlobalContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    try {
      const response = await axios.post(
        "https://supermarket-automation.onrender.com/login",
        {
          email,
          password,
        }
      );

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("type", response.data.type);
      login({ token: response.data.token, type: response.data.type });

      if (response.data.type === "manager") {
        // <Link to="/manager" />;
        navigate("/manager");
      } else if (response.data.type === "employee") {
        // <Link to="/employee" />;
        navigate("/employee");
      } else if (response.data.type === "clerk") {
        // <Link to="/clerk" />;
        navigate("/clerk");
      } else {
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
