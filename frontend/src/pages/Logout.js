import React, { useEffect } from "react";
import { toast, ToastContainer } from "react-toastify"; // Import toast
import "react-toastify/dist/ReactToastify.css";

function Logout() {
  useEffect(() => {
    // Remove items from local storage
    localStorage.removeItem("token");
    localStorage.removeItem("type");

    // Show logout success toast
    toast.success("Logged out successfully!");

    // Redirect after 2 seconds
    setTimeout(() => {
      window.location.href = "/";
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
