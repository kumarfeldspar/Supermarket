import React from "react";
import { Link } from "react-router-dom";

function ClerkNavbar() {
  return (
    <div>
      <ul className="side-menu top">
        <li className="active">
          <Link to="/clerk">
            <i className="bx bxs-dashboard"></i>
            <span className="text">Dashboard Clerk</span>
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default ClerkNavbar;
