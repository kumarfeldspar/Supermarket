import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import "./ChangePrice.css";
import { toast, ToastContainer } from "react-toastify"; // Import toast
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../../context/GlobalContext";

function ChangePrice() {
  const navigate = useNavigate();
  const [itemId, setItemId] = useState("");
  const [newPrice, setNewPrice] = useState("");
  const { token } = useContext(GlobalContext);
  const [item, setItem] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const data = await axios.post(
        "https://supermarket-automation.onrender.com/item"
      );
      setItem(data.data);
    }
    fetchData();
  }, []);

  const handleChangePrice = async () => {
    try {
      await axios.post(
        "https://supermarket-automation.onrender.com/changePrice",
        {
          token: token,
          itemId: itemId,
          newPrice: newPrice,
        }
      );
      toast.success("Price changed successfully"); // Show success toast
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
      navigate("/unauthorized");
    }
  }, []);

  return (
    <div className="changePriceContainer">
      <label>Item name:</label>
      <select
        className="clerkInput"
        type="text"
        value={itemId}
        onChange={(e) => setItemId(e.target.value)}
      >
        <option value="">Select Item</option>
        {item.map((item, index) => (
          <option key={index} value={item.itemId}>
            {item.name}
          </option>
        ))}
      </select>
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
      <ToastContainer /> {/* Toast container */}
    </div>
  );
}

export default ChangePrice;
