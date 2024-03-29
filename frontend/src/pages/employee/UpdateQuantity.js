import React, { useState, useEffect } from "react";
import axios from "axios";
import "./UpdateQuantity.css"; // Import the CSS file

function UpdateQuantity() {
  const [itemId, setItemId] = useState("");
  const [quantity, setQuantity] = useState("");
  const [token, setToken] = useState(localStorage.getItem("token"));

  useEffect(() => {
    setToken(localStorage.getItem("token"));
  }, []);

  const handleUpdateQuantity = async () => {
    try {
      await axios.post("http://localhost:5000/updateQuantity", {
        token: token,
        itemId: itemId,
        quantity: quantity,
      });
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
      window.location.href = "/unauthorized";
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
