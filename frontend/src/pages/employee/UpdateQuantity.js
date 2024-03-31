import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import "./UpdateQuantity.css"; // Import the CSS file
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../../context/GlobalContext";

function UpdateQuantity() {
  const navigate = useNavigate();
  const [itemId, setItemId] = useState("");
  const [quantity, setQuantity] = useState("");

  const { type, isLoggined, token } = useContext(GlobalContext);
  useEffect(() => {
    if (!isLoggined || type !== "employee") {
      navigate("/unauthorized");
    }
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
