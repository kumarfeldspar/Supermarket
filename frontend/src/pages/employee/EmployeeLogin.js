import React from "react";
function EmployeeLogin() {
  return (
    <div>
      <button onClick={() => (window.location.href = "/additem")}>
        Add Item
      </button>
      <button onClick={() => (window.location.href = "/updatequantity")}>
        Update Quantity
      </button>
    </div>
  );
}

export default EmployeeLogin;
