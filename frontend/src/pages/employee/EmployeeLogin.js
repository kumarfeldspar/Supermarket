import React from "react";
import "./EmployeeLogin.css"; // Import the CSS file

function EmployeeLogin() {
  return (
    <div className="loginContainer">
      <div className="employeeContainer">
        <button
          className="employeeButton"
          onClick={() => (window.location.href = "/additem")}
        >
          Add Item
        </button>
        <button
          className="employeeButton"
          onClick={() => (window.location.href = "/updatequantity")}
        >
          Update Quantity
        </button>
      </div>
    </div>
  );
}

export default EmployeeLogin;
