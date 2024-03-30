import React, { useContext, useEffect } from "react";
import { GlobalContext } from "../context/GlobalContext";
import { useNavigate } from "react-router-dom";
function Unauthorized() {
  const { type, isLoggined, token } = useContext(GlobalContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (isLoggined && type === "manager") navigate("/manager");
    if (isLoggined && type === "employee") navigate("/employee");
    if (isLoggined && type === "clerk") navigate("/clerk");
  }, [type, isLoggined, token]);
  return <div>You are not authorized to view this page.</div>;
}

export default Unauthorized;
