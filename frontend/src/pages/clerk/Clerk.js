import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import "./Clerk.css";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../../context/GlobalContext";

function Clerk() {
  const navigate = useNavigate();
  const [billDetails, setBillDetails] = useState([]);
  const [currentItemId, setCurrentItemId] = useState("");
  const [currentQuantity, setCurrentQuantity] = useState("");
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [userInfoCollected, setUserInfoCollected] = useState(false);
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

  const { type, isLoggined, token } = useContext(GlobalContext);

  useEffect(() => {
    if (!isLoggined || type !== "clerk") {
      navigate("/unauthorized");
    }
  }, []);

  const handleClerk = () => {
    if (!userInfoCollected) {
      // If user info not collected yet, collect it
      if (name.trim() !== "" && phoneNumber.trim() !== "") {
        setUserInfoCollected(true);
      } else {
        alert("Please enter name and phone number.");
      }
    } else {
      if (currentItemId.trim() !== "" && currentQuantity.trim() !== "") {
        const newBillDetail = {
          itemId: currentItemId,
          quantity: currentQuantity,
        };
        setBillDetails([...billDetails, newBillDetail]);
        setCurrentItemId("");
        setCurrentQuantity("");
      }
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

      // Add Supermarket Name and Buyer's Name
      const supermarketName =
        "                                 IIT ISM Supermarket";
      const buyerName = name;
      const buyerPhoneNumber = phoneNumber;

      // Get current date and time
      const currentDate = new Date().toLocaleString();

      // Print Supermarket Name, Buyer's Name, and Date
      doc.text(supermarketName, 10, 10);
      doc.text("Buyer's Name: " + buyerName, 10, 20);
      doc.text("Phone Number: " + buyerPhoneNumber, 10, 30);
      doc.text("Date: " + currentDate, 10, 40);

      // Print Bill Number and Total Amount
      doc.text("Bill Number: " + response.data.billNumber, 10, 50);
      doc.text("Total Amount: " + response.data.totalAmount, 10, 60);

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
        startY: 70,
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

  return (
    <div className="clerkContainer">
      <h2 className="clerkHeader">Add Items</h2>
      {!userInfoCollected ? (
        <div>
          <div>
            <label>Name:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label>Phone Number:</label>
            <input
              type="text"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </div>
          <button className="clerkButton" onClick={handleClerk}>
            Save Info
          </button>
        </div>
      ) : (
        <div>
          <div>
            <label>Item name:</label>
            <select
              className="clerkInput"
              type="text"
              value={currentItemId}
              onChange={(e) => setCurrentItemId(e.target.value)}
            >
              <option value="">Select Item</option>
              {item.map((item, index) => (
                <option key={index} value={item.itemId}>
                  {item.name}
                </option>
              ))}
            </select>
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
      )}
      <div>
        <h3>Items List:</h3>
        <ul className="itemsList">
          {billDetails.map((detail, index) => (
            <li key={index}>
              {console.log(detail)}
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
