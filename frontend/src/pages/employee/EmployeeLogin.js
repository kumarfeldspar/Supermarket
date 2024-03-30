import React, { useEffect } from "react";
import "./EmployeeLogin.css"; // Import the CSS file
import { useNavigate } from "react-router-dom";

function EmployeeLogin() {
  const navigate = useNavigate();
  useEffect(() => {
    if (
      !localStorage.getItem("token") ||
      localStorage.getItem("type") !== "employee"
    ) {
      navigate("/unauthorized");
    }
  }, []);
  return (
    <div className="loginContainer">
      <div className="employeeContainer">
        <button
          className="employeeButton"
          onClick={() => (navigate("/additem"))}
        >
          Add Item
        </button>
        <button
          className="employeeButton"
          onClick={() => (navigate("/updateitem"))}
        >
          Update Quantity
        </button>
      </div>
    </div>
  );
}

export default EmployeeLogin;
