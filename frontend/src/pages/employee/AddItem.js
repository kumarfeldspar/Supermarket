import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import "./AddItem.css"; // Import the CSS file
import { toast, ToastContainer } from "react-toastify"; // Import toast
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../../context/GlobalContext";

function AddItem() {
  const navigate = useNavigate();
  const [itemName, setItemName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");

  const { type, isLoggined, token } = useContext(GlobalContext);
  useEffect(() => {
    if (!isLoggined || type !== "employee") {
      navigate("/unauthorized");
    }
  }, []);

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
      toast.success("Item added successfully");
      console.log("Item added successfully");
      // You may want to do something with the response here if needed
    } catch (error) {
      console.log(error);
    }
  };

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
      <ToastContainer />
    </div>
  );
}

export default AddItem;
