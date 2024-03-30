import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { GlobalContext } from "../context/GlobalContext";

const NavbarSideMenu = () => {
  const { isLoggined } = useContext(GlobalContext);
  useEffect(() => {
    console.log("isLoggedin", isLoggined);
  }, [isLoggined]);

  return (
    <>
      <ul className="side-menu">
        {isLoggined && (
          <li>
            <Link to="/logout" className="logout">
              <i className="bx bxs-log-out-circle"></i>
              <span className="text">Logout</span>
            </Link>
          </li>
        )}
        {!isLoggined && (
          <>
            <li>
              <Link to="/login" className="login">
                <i className="bx bxs-log-in-circle"></i>
                <span className="text">LogIn</span>
              </Link>
            </li>
            <li>
              <Link to="/register" className="registration">
                <i className="bx bxs-registered"></i>
                <span className="text">Registration</span>
              </Link>
            </li>
          </>
        )}
      </ul>
    </>
  );
};

export default NavbarSideMenu;
