const express = require("express");
const router = express.Router();
const User = require("../models/user");
const Bill = require("../models/bill");
const verifySignIn = require("../middlewares/verifySignIn");

// Route to get the quantity of items sold for a specific product ID within a date range
router.post("/itemsSold", verifySignIn, async (req, res) => {
  console.log("here");
  const { _id, productId, startDate, endDate } = req.body;
  const user = await User.findById(_id);
  if (!user) {
    return res.status(422).json({ error: "Invalid user" });
  }
  if (user.type !== "manager") {
    return res.status(422).json({ error: "You are not authorized" });
  }

  try {
    // Query the database to find bills containing the specified product ID within the date range
    const bills = await Bill.find({
      createdAt: { $gte: new Date(startDate), $lte: new Date(endDate) },
      "billDetails.itemId": productId,
    });
    console.log(startDate, endDate, bills);

    // Calculate the total quantity and amount sold for that product ID within the date range
    let totalQuantitySold = 0;
    let totalSoldPrice = 0;

    bills.forEach((bill) => {
      bill.billDetails.forEach((item) => {
        if (item.itemId === productId) {
          totalQuantitySold += item.quantity;
          totalSoldPrice += item.quantity * item.unitPrice;
        }
      });
    });

    // Return the quantity and amount sold within the date range as the response
    res.json({ productId, totalQuantitySold, totalSoldPrice });
  } catch (error) {
    console.error("Error fetching data from database:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
