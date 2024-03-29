import React, { useEffect } from "react";

function Logout() {
  useEffect(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("type");
    setTimeout(() => {
      window.location.href = "/";
    }, 2000);
  }, []);

  return (
    <div>
      <h1>Logout</h1>
      <p>Thank you for using our service. Please fuck off</p>
    </div>
  );
}

export default Logout;
