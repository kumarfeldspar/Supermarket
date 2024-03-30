import React, { useEffect, useState,useContext } from "react";
import { Link } from "react-router-dom";
import NavbarSideMenu from "./NavbarSideMenu";
import ManagerNavbar from "./ManagerNavbar";
import ClerkNavbar from "./ClerkNavbar";
import EmployeeNavbar from "./EmployeeNavbar";
import { GlobalContext } from "../context/GlobalContext";

const MainNavbarDesigned = () => {
  const {type} = useContext(GlobalContext)

  return (
    <>
      <section id="sidebar">
        <Link to="/" className="brand">
          <span className="text ms-3">SAS</span>
        </Link>
        {type && type === "manager" && <ManagerNavbar />}
        {type && type === "clerk" && <ClerkNavbar />}
        {type && type === "employee" && <EmployeeNavbar />}

        <NavbarSideMenu />
      </section>
    </>
  );
};

export default MainNavbarDesigned;
