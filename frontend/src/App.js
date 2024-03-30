import React, { useEffect } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AddItem from "./pages/employee/AddItem";
import EmployeeLogin from "./pages/employee/EmployeeLogin";
import UpdateQuantity from "./pages/employee/UpdateQuantity";
import Clerk from "./pages/clerk/Clerk";
import TrackItem from "./pages/manager/TrackItem";
import ChangePrice from "./pages/manager/ChangePrice";
import ManagerLogin from "./pages/manager/ManagerLogin";
import MainRouteLayout from "./components/MainRouteLayout";
import Logout from "./pages/Logout";
import Unauthorized from "./pages/Unauthorized.js";
import "./Responsive.js";
import HomePage from "./pages/HomePage";

function App() {
  useEffect(() => {
    const menuBar = document.querySelector("#content nav .bx.bx-menu");
    const sidebar = document.getElementById("sidebar");

    const handleClick = () => {
      if (!sidebar) return;
      sidebar.classList.toggle("hide");
    };

    if (menuBar) {
      menuBar.addEventListener("click", handleClick);
    }

    const switchMode = document.getElementById("switch-mode");

    const handleModeChange = () => {
      if (switchMode.checked) {
        document.body.classList.add("dark");
      } else {
        document.body.classList.remove("dark");
      }
    };

    if (switchMode) {
      switchMode.addEventListener("change", handleModeChange);
    }
    /*
to stop rerendering we use the below function
*/
    return () => {
      if (menuBar) {
        menuBar.removeEventListener("click", handleClick);
      }
      if (switchMode) {
        switchMode.removeEventListener("change", handleModeChange);
      }
    };
  }, []);
  return (
    <Routes>
      <Route path="/" element={<MainRouteLayout />}>
        <Route path="/" element={<HomePage/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/addItem" element={<AddItem />} />
        <Route path="/employee" element={<EmployeeLogin />} />
        <Route path="/updateQuantity" element={<UpdateQuantity />} />
        <Route path="/clerk" element={<Clerk />} />
        <Route path="/trackItem" element={<TrackItem />} />
        <Route path="/changePrice" element={<ChangePrice />} />
        <Route path="/manager" element={<ManagerLogin />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
      </Route>
    </Routes>
  );
}

export default App;
