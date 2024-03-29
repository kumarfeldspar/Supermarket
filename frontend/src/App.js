import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import { toast } from "react-toastify";
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
import "./Responsive.js";

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainRouteLayout />}>
        <Route path="/" element={<h1>Home</h1>} />
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
      </Route>
    </Routes>
  );
}

export default App;
