import React, { useEffect,useContext } from "react";
import { Link } from "react-router-dom";
import "./ManagerLogin.css"; // Import the CSS file
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../../context/GlobalContext";

function ManagerLogin() {
  const navigate = useNavigate();
  const { type, isLoggined } = useContext(GlobalContext)
  useEffect(() => {
    if (
      !isLoggined || type !== "manager"
    ) {
      navigate("/unauthorized");
    }
  }, []);

  return (
    <div className="managerLoginContainer">
      <h2 className="managerLoginTitle">Welcome Manager</h2>
      <Link to="/changePrice">
        <button className="managerLoginButton">Change Price</button>
      </Link>
      <Link to="/trackItem">
        <button className="managerLoginButton">Track Item</button>
      </Link>
    </div>
  );
}

export default ManagerLogin;
