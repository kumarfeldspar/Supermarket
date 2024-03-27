import React from "react";
import { Link } from "react-router-dom";

function ManagerLogin() {
  return (
    <div>
      <h2>Manager Login</h2>
      <Link to="/changePrice">
        <button>Change Price</button>
      </Link>
      <Link to="/trackItem">
        <button>Track Item</button>
      </Link>
    </div>
  );
}

export default ManagerLogin;
