import React, { useState, useEffect } from "react";
import axios from "axios";
import "./TrackItem.css"; // Import the CSS file

function TrackItem() {
  const [itemId, setItemId] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [token, setToken] = useState(localStorage.getItem("token"));

  useEffect(() => {
    setToken(localStorage.getItem("token"));
  }, []);

  const handleTrackItem = async () => {
    try {
      await axios.get("http://localhost:5000/itemsSold", {
        params: {
          _id: token, // Assuming this is the user ID
          productId: itemId,
          startDate: startDate,
          endDate: endDate,
        },
      });
      console.log("Item tracking successful");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="trackItemContainer">
      <input
        className="trackItemInput"
        type="number"
        placeholder="Item ID"
        value={itemId}
        onChange={(e) => setItemId(e.target.value)}
      />
      <input
        className="trackItemInput"
        type="date"
        placeholder="Start Date"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
      />
      <input
        className="trackItemInput"
        type="date"
        placeholder="End Date"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
      />
      <button className="trackItemButton" onClick={handleTrackItem}>
        Track Item
      </button>
    </div>
  );
}

export default TrackItem;
