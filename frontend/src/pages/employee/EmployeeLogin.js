import React, { useEffect, useContext } from "react";
import "./EmployeeLogin.css"; // Import the CSS file
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../../context/GlobalContext";

function EmployeeLogin() {
  const navigate = useNavigate();
  const { type, isLoggined, token } = useContext(GlobalContext);
  useEffect(() => {
    if (!isLoggined || type !== "employee") {
      navigate("/unauthorized");
    }
  }, []);
  return (
    <div className="loginContainer">
      <div className="employeeContainer">
        <button className="employeeButton" onClick={() => navigate("/additem")}>
          Add Item
        </button>
        <button
          className="employeeButton"
          onClick={() => navigate("/updateQuantity")}
        >
          Update Quantity
        </button>
      </div>
    </div>
  );
}

export default EmployeeLogin;
