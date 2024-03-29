import React, { useState } from "react";
import axios from "axios";
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

      // Redirect based on user type
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
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
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
      {/* <div className="table-data">
        <div className="order">
          <table>
            <tbody>
              <tr>
                <td>
                  <input
                    className="loginInput"
                    type="text"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </td>
              </tr>
              <tr>
                <input
                  className="loginInput"
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </tr>
              <tr>
                <td>
                  <button className="loginButton" onClick={handleLogin}>
                    Login
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div> */}
    </>
  );
}

export default Login;
