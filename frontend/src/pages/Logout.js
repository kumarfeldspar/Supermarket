import React, { useEffect,useContext } from "react";
import { toast, ToastContainer } from "react-toastify"; // Import toast
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../context/GlobalContext";

function Logout() {
  const { logout} =useContext(GlobalContext)
  const navigate = useNavigate();
  useEffect(() => {
    // Remove items from local storage
    localStorage.removeItem("token");
    localStorage.removeItem("type");
    logout();
    // Show logout success toast
    toast.success("Logged out successfully!");

    // Redirect after 2 seconds
    setTimeout(() => {
      navigate("/"); // Redirect to home page
    }, 2000);
  }, []);

  return (
    <div>
      <ToastContainer />
      <h1>Logout</h1>
      <p>Thank you for using our service.</p>
    </div>
  );
}

export default Logout;
