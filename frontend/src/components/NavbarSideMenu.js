import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const NavbarSideMenu = () => {
  const [loginToken, setLoginToken] = useState(null);
  useEffect(() => {
    setLoginToken(localStorage.getItem("token"));
  }, [loginToken]);

  return (
    <>
      <ul className="side-menu">
        {loginToken && (
          <li>
            <Link to="/logout" className="logout">
              <i className="bx bxs-log-out-circle"></i>
              <span className="text">Logout</span>
            </Link>
          </li>
        )}
        {!loginToken && (
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
