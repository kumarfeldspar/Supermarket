import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Clerk.css";
import jsPDF from "jspdf"; // Import jsPDF directly
import "jspdf-autotable";
import { useNavigate } from "react-router-dom";

function Clerk() {

  const navigate=useNavigate();
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
      const response = await axios.post(
        "https://supermarket-automation.onrender.com/generateBill",
        {
          token: token,
          billDetails: billDetails,
        }
      );

      console.log("Items added successfully");
      setBillDetails([]);

      const doc = new jsPDF();
      console.log(response.data);
      //left width top width
      doc.text("Bill Number: " + response.data.billNumber, 10, 10);
      doc.text("Total Amount: " + response.data.totalAmount, 10, 20);

      const headers = [
        "Item Name",
        "Item ID",
        "Unit Price",
        "Quantity",
        "Item Price",
      ];
      const tableData = [];
      response.data.billDetails.forEach((item) => {
        tableData.push([
          item.name,
          item.itemId,
          item.unitPrice,
          item.quantity,
          item.itemPrice,
        ]);
      });

      doc.autoTable({
        startY: 30,
        head: [headers],
        body: tableData,
        theme: "grid",
        styles: { cellPadding: 1.5, fontSize: 10, textColor: [0, 0, 0] },
      });

      doc.save("bill.pdf");
    } catch (error) {
      console.error("Error adding items:", error);
    }
  };

  useEffect(() => {
    if (
      !localStorage.getItem("token") ||
      localStorage.getItem("type") !== "clerk"
    ) {
      navigate("/unauthorized");
    }
  }, []);

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
