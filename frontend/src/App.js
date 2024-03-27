import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AddItem from "./pages/employee/AddItem";
import EmployeeLogin from "./pages/employee/EmployeeLogin";
import UpdateQuantity from "./pages/employee/UpdateQuantity";
import Clerk from "./pages/clerk/Clerk";
import TrackItem from "./pages/manager/TrackItem";
import ChangePrice from "./pages/manager/ChangePrice";
import ManagerLogin from "./pages/manager/ManagerLogin";

function App() {
  return (
    <Routes>
      <Route path="/" element={<h1>Home</h1>} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/addItem" element={<AddItem />} />
      <Route path="/employeeLogin" element={<EmployeeLogin />} />
      <Route path="/updateQuantity" element={<UpdateQuantity />} />
      <Route path="/clerk" element={<Clerk />} />
      <Route path="/trackItem" element={<TrackItem />} />
      <Route path="/changePrice" element={<ChangePrice />} />
      <Route path="/manager" element={<ManagerLogin />} />
    </Routes>
  );
}

export default App;
