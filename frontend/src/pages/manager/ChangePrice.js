import React, { useState, useEffect } from "react";
import axios from "axios";

function ChangePrice() {
  const [itemId, setItemId] = useState("");
  const [newPrice, setnewPrice] = useState("");
  const [token, setToken] = useState(localStorage.getItem("token"));

  useEffect(() => {
    setToken(localStorage.getItem("token"));
  }, []);
  const handleChangePrice = async () => {
    try {
      // Add item to the database
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

  return (
    <div>
      <input
        type="number"
        placeholder="ItemId"
        value={itemId}
        onChange={(e) => setItemId(e.target.value)}
      />
      <input
        type="number"
        placeholder="New Price"
        value={newPrice}
        onChange={(e) => setnewPrice(e.target.value)}
      />
      <button onClick={handleChangePrice}>setnewPrice </button>
    </div>
  );
}

export default ChangePrice;
