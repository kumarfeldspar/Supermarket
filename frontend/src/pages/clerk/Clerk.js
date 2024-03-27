import React, { useState, useEffect } from "react";
import axios from "axios";

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
  console.log(billDetails);

  const handleSubmit = async () => {
    try {
      // Send billDetails data to server with token in headers
      await axios.post("http://localhost:5000/generateBill", {
        token: token,
        billDetails: billDetails,
      });
      console.log("Items added successfully");
      // Clear billDetails after submission if needed
      setBillDetails([]);
    } catch (error) {
      console.error("Error adding items:", error);
    }
  };

  return (
    <div>
      <h2>Add Items</h2>
      <div>
        <label>Item ID:</label>
        <input
          type="text"
          value={currentItemId}
          onChange={(e) => setCurrentItemId(e.target.value)}
        />
        <label>Quantity:</label>
        <input
          type="number"
          value={currentQuantity}
          onChange={(e) => setCurrentQuantity(e.target.value)}
        />
        <button onClick={handleClerk}>Add</button>
      </div>
      <div>
        <h3>Items List:</h3>
        <ul>
          {billDetails.map((detail, index) => (
            <li key={index}>
              Item ID: {detail.itemId}, Quantity: {detail.quantity}
            </li>
          ))}
        </ul>
      </div>
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}

export default Clerk;

//to add when was bill generated and name of the buyer
