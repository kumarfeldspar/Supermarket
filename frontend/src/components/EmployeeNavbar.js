import React from "react";
import { Link } from "react-router-dom";
function EmployeeNavbar() {
  return (
    <div>
      <ul className="side-menu top">
        <li className="active">
          <Link to="/employee">
            <i className="bx bxs-dashboard"></i>
            <span className="text">Dashboard Employee</span>
          </Link>
        </li>
        <li className="active">
          <Link to="/AddItem">
            <i className="bx bxs-dashboard"></i>
            <span className="text">Add Item</span>
          </Link>
        </li>
        <li className="active">
          <Link to="/updateQuantity">
            <i className="bx bxs-dashboard"></i>
            <span className="text">Update Quantity</span>
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default EmployeeNavbar;
