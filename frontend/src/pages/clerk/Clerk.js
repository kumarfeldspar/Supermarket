import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Clerk.css"; // Import the CSS file

function Clerk() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [billDetails, setBillDetails] = useState([]);
  const [currentItemId, setCurrentItemId] = useState("");
  const [currentQuantity, setCurrentQuantity] = useState("");

  useEffect(() => {
    setToken(localStorage.getItem("token"));
  }, []);

  const handleClerk = () => {
    if (currentItemId.trim() !== "" && currentQuantity.trim() !== "") {
      const newBillDetail = {
        itemId: currentItemId,
        quantity: currentQuantity,
      };
      setBillDetails([...billDetails, newBillDetail]);
      setCurrentItemId("");
      setCurrentQuantity("");
    }
  };

  const handleSubmit = async () => {
    try {
      await axios.post("http://localhost:5000/generateBill", {
        token: token,
        billDetails: billDetails,
      });
      console.log("Items added successfully");
      setBillDetails([]);
    } catch (error) {
      console.error("Error adding items:", error);
    }
  };

  return (
    <div className="clerkContainer">
      <h2 className="clerkHeader">Add Items</h2>
      <div>
        <div>
          <label>Item ID:</label>
          <input
            className="clerkInput"
            type="text"
            value={currentItemId}
            onChange={(e) => setCurrentItemId(e.target.value)}
          />
        </div>
        <div>
          <label>Quantity:</label>
          <input
            className="clerkInput"
            type="number"
            value={currentQuantity}
            onChange={(e) => setCurrentQuantity(e.target.value)}
          />
        </div>
        <button className="clerkButton" onClick={handleClerk}>
          Add
        </button>
      </div>
      <div>
        <h3>Items List:</h3>
        <ul className="itemsList">
          {billDetails.map((detail, index) => (
            <li key={index}>
              Item ID: {detail.itemId}, Quantity: {detail.quantity}
            </li>
          ))}
        </ul>
      </div>
      <button className="clerkButton" onClick={handleSubmit}>
        Submit
      </button>
    </div>
  );
}

export default Clerk;
