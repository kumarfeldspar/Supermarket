import React, { useState, useEffect } from "react";
import axios from "axios";

function TrackItem() {
  const [itemId, setItemId] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [token, setToken] = useState(localStorage.getItem("token"));
  console.log("in track item");
  useEffect(() => {
    setToken(localStorage.getItem("token"));
  }, []);
  console.log(token);
  const handleTrackItem = async () => {
    try {
      // Add item to the database
      await axios.get("http://localhost:5000/items-sold", {
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
    <div>
      <input
        type="number"
        placeholder="Item ID"
        value={itemId}
        onChange={(e) => setItemId(e.target.value)}
      />
      <input
        type="date"
        placeholder="Start Date"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
      />
      <input
        type="date"
        placeholder="End Date"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
      />
      <button onClick={handleTrackItem}>Track Item</button>
    </div>
  );
}

export default TrackItem;
