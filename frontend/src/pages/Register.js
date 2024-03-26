import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [type, setType] = useState("");

  // Toast functions
  const notifyA = (msg) => toast.success(msg);
  const notifyB = (msg) => toast.error(msg);

  const handleRegister = async () => {
    try {
      await axios.post("http://localhost:5000/signup", {
        name,
        email,
        password,
        type,
      });
      notifyA("Registration successful");
      console.log("Registered successfully");
    } catch (error) {
      notifyB("Registration failed. Please try again.");
      console.log(error);
    }
  };

  return (
    <div>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <select value={type} onChange={(e) => setType(e.target.value)}>
        <option value="employee">Employee</option>
        <option value="manager">Manager</option>
        <option value="clerk">Clerk</option>
      </select>
      <button onClick={handleRegister}>Register</button>
    </div>
  );
}

export default Register;



