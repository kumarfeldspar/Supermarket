import React, { useState, useEffect } from "react";
import axios from "axios";

function AddItem() {
  console.log("in addItem");
  const [itemName, setItemName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [token, setToken] = useState(localStorage.getItem("token"));

  useEffect(() => {
    // Update the token when it changes in localStorage
    setToken(localStorage.getItem("token"));
  }, []); // This effect runs only once, after the initial render
  console.log(token);
  const handleAddItem = async () => {
    try {
      // Add item to the database
      await axios.post("http://localhost:5000/addInventory", {
        token: token,
        name: itemName,
        price: price,
        quantity: quantity,
        photoUrl: photoUrl,
      });
        /*not writing token here was the problem
        this is json data that is being sent to the backend
        */
      console.log("Item added successfully");
      // You may want to do something with the response here if needed
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Item Name"
        value={itemName}
        onChange={(e) => setItemName(e.target.value)}
      />
      <input
        type="number"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      <input
        type="number"
        placeholder="Quantity"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
      />
      <input
        type="text"
        placeholder="photoUrl"
        value={photoUrl}
        onChange={(e) => setPhotoUrl(e.target.value)}
      />
      <button onClick={handleAddItem}>Add item </button>
    </div>
  );
}

export default AddItem;
