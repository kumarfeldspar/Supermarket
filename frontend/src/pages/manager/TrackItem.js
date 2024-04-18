import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import "./TrackItem.css";
import { GlobalContext } from "../../context/GlobalContext";
const { useNavigate } = require("react-router-dom");

function TrackItem() {
  const navigate = useNavigate();
  const [itemId, setItemId] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [data, setData] = useState(null);

  const { type, isLoggined, token } = useContext(GlobalContext);
  useEffect(() => {
    if (!isLoggined || type !== "manager") {
      navigate("/unauthorized");
    }
  }, []);

  const handleTrackItem = async () => {
    try {
      const resopnse = await axios.post("http://localhost:5000/itemsSold", {
        token: token, // Assuming this is the user ID
        productId: itemId,
        startDate: startDate,
        endDate: endDate,
      });
      setData(resopnse.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
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
      {data && (
        <div className="trackItemData">
          <h4>productId: {data?.productId}</h4>
          <h4>Item totalQuantitySold: {data?.totalQuantitySold}</h4>
          <h4>totalSoldPrice: {data?.totalSoldPrice}</h4>
        </div>
      )}
    </>
  );
}
//?.  if data is null then it will not throw an error if we use data.productId it will throw an error if data is null
//? is called optional chaining

export default TrackItem;
