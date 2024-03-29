import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "./ManagerLogin.css"; // Import the CSS file

function ManagerLogin() {
  useEffect(() => {
    if (
      !localStorage.getItem("token") ||
      localStorage.getItem("type") !== "manager"
    ) {
      window.location.href = "/unauthorized";
    }
  }, []);

  return (
    <div className="managerLoginContainer">
      <h2 className="managerLoginTitle">Welcome Manager</h2>
      <Link to="/changePrice">
        <button className="managerLoginButton">Change Price</button>
      </Link>
      <Link to="/trackItem">
        <button className="managerLoginButton">Track Item</button>
      </Link>
    </div>
  );
}

export default ManagerLogin;
