import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AddItem.css"; // Import the CSS file

function AddItem() {
  const [itemName, setItemName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [token, setToken] = useState(localStorage.getItem("token"));

  useEffect(() => {
    // Update the token when it changes in localStorage
    setToken(localStorage.getItem("token"));
  }, []); // This effect runs only once, after the initial render

  const handleAddItem = async () => {
    try {
      // Add item to the database
      await axios.post(
        "https://supermarket-automation.onrender.com/addInventory",
        {
          token: token,
          name: itemName,
          price: price,
          quantity: quantity,
          photoUrl: photoUrl,
        }
      );
      console.log("Item added successfully");
      // You may want to do something with the response here if needed
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
    <div className="addItemContainer">
      <input
        className="inputField"
        type="text"
        placeholder="Item Name"
        value={itemName}
        onChange={(e) => setItemName(e.target.value)}
      />
      <input
        className="inputField"
        type="number"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      <input
        className="inputField"
        type="number"
        placeholder="Quantity"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
      />
      <input
        className="inputField"
        type="text"
        placeholder="photoUrl"
        value={photoUrl}
        onChange={(e) => setPhotoUrl(e.target.value)}
      />
      <button className="addButton" onClick={handleAddItem}>
        Add item
      </button>
    </div>
  );
}

export default AddItem;
