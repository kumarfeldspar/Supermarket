import React, { useState, useEffect } from "react";
import axios from "axios";
import "./UpdateQuantity.css"; // Import the CSS file
import { useNavigate } from "react-router-dom";

function UpdateQuantity() {
  const navigate = useNavigate();
  const [itemId, setItemId] = useState("");
  const [quantity, setQuantity] = useState("");
  const [token, setToken] = useState(localStorage.getItem("token"));

  useEffect(() => {
    setToken(localStorage.getItem("token"));
  }, []);

  const handleUpdateQuantity = async () => {
    try {
      await axios.post(
        "https://supermarket-automation.onrender.com/updateQuantity",
        {
          token: token,
          itemId: itemId,
          quantity: quantity,
        }
      );
      console.log("Quantity updated successfully");
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (
      !localStorage.getItem("token") ||
      localStorage.getItem("type") !== "employee"
    ) {
      navigate("/unauthorized");
    }
  }, []);
  return (
    <div className="updateQuantityContainer">
      <input
        className="updateQuantityInput"
        type="number"
        placeholder="Item ID"
        value={itemId}
        onChange={(e) => setItemId(e.target.value)}
      />
      <input
        className="updateQuantityInput"
        type="number"
        placeholder="Quantity"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
      />
      <button className="updateQuantityButton" onClick={handleUpdateQuantity}>
        Update Quantity
      </button>
    </div>
  );
}

export default UpdateQuantity;
