import React, { useState, useEffect } from "react";
import axios from "axios";

function AddItem() {
  const [itemId, setItemId] = useState("");
  const [quantity, setQuantity] = useState("");
  const [token, setToken] = useState(localStorage.getItem("token"));

  useEffect(() => {
    setToken(localStorage.getItem("token"));
  }, []);
  const handleAddItem = async () => {
    try {
      // Add item to the database
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
        placeholder="Quantity"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
      />
      <button onClick={handleAddItem}>Add item </button>
    </div>
  );
}

export default AddItem;
