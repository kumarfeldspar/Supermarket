import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import NavbarDesigned from "./NavbarDesigned";

const MainRouteLayout = () => {
  return (
    <>
      <Navbar />
      <NavbarDesigned children={<Outlet />} />
    </>
  );
};

export default MainRouteLayout;
