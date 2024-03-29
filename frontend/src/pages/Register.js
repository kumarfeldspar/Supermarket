import React, { useState } from "react";
import axios from "axios";
import "./Register.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [type, setType] = useState("");

  // Toast functions
  const notifySuccess = (msg) => toast.success(msg);
  const notifyError = (msg) => toast.error(msg);

  const handleRegister = async () => {
    if (!email || !password || !name || !type) {
      notifyError("Please fill in all fields");
      return;
    }

    try {
      await axios.post("http://localhost:5000/signup", {
        name,
        email,
        password,
        type,
      });
      notifySuccess("Registration successful");
      console.log("Registered successfully");
    } catch (error) {
      notifyError("Registration failed. Please try again.");
      console.log(error);
    }
  };

  return (
    <div className="registerContainer">
      {" "}
      {/* Add className for styling */}
      <div className="registerBox">
        {" "}
        {/* Enclose fields inside a div */}
        <input
          className="registerInput"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="registerInput"
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className="registerInput"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <select
          className="registerSelect"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="">Select Type</option>
          <option value="employee">Employee</option>
          <option value="manager">Manager</option>
          <option value="clerk">Clerk</option>
        </select>
        <button className="registerButton" onClick={handleRegister}>
          Register
        </button>
      </div>
    </div>
  );
}

export default Register;
