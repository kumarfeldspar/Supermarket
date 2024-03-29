import React, { useEffect,useState } from "react";
import { Link } from "react-router-dom";
import NavbarSideMenu from "./NavbarSideMenu";
import ManagerNavbar from "./ManagerNavbar";

const MainNavbarDesigned = () => {
    const [user, setUser] = useState("");
    useEffect(() => {
        setUser(localStorage.getItem("type"));
    }, []);

  return (
    <>
      <section id="sidebar">
        <Link to="/" className="brand">
          <span className="text ms-3">JIS</span>
        </Link>
        {user && (user ==="manager")&&(
            <ManagerNavbar />
        )}
       
        <NavbarSideMenu />
      </section>
    </>
  );
};

export default MainNavbarDesigned;
