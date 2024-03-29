import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import NavbarSideMenu from "./NavbarSideMenu";
import ManagerNavbar from "./ManagerNavbar";
import ClerkNavbar from "./ClerkNavbar";
import EmployeeNavbar from "./EmployeeNavbar";

const MainNavbarDesigned = () => {
  const [user, setUser] = useState("");
  useEffect(() => {
    setUser(localStorage.getItem("type"));
  }, []);

  return (
    <>
      <section id="sidebar">
        <Link to="/" className="brand">
          <span className="text ms-3">SAS</span>
        </Link>
        {user && user === "manager" && <ManagerNavbar />}
        {user && user === "clerk" && <ClerkNavbar />}
        {user && user === "employee" && <EmployeeNavbar />}

        <NavbarSideMenu />
      </section>
    </>
  );
};

export default MainNavbarDesigned;
