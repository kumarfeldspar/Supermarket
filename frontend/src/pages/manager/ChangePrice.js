import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ChangePrice.css"; // Import the CSS file

function ChangePrice() {
  const [itemId, setItemId] = useState("");
  const [newPrice, setNewPrice] = useState("");
  const [token, setToken] = useState(localStorage.getItem("token"));

  useEffect(() => {
    setToken(localStorage.getItem("token"));
  }, []);

  const handleChangePrice = async () => {
    try {
      await axios.post("http://localhost:5000/changePrice", {
        token: token,
        itemId: itemId,
        newPrice: newPrice,
      });
      console.log("Price updated successfully");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (
      !localStorage.getItem("token") ||
      localStorage.getItem("type") !== "manager"
    ) {
      window.location.href = "/unauthorized";
    }
  }, []);

  return (
    <div className="changePriceContainer">
      <input
        className="changePriceInput"
        type="number"
        placeholder="Item ID"
        value={itemId}
        onChange={(e) => setItemId(e.target.value)}
      />
      <input
        className="changePriceInput"
        type="number"
        placeholder="New Price"
        value={newPrice}
        onChange={(e) => setNewPrice(e.target.value)}
      />
      <button className="changePriceButton" onClick={handleChangePrice}>
        Set New Price
      </button>
    </div>
  );
}

export default ChangePrice;
