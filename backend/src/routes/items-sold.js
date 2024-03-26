const express = require("express");
const router = express.Router();
const User = require("../models/user");
const Bill = require("../models/bill");
const verifySignIn = require("../middlewares/verifySignIn");

// Route to get the quantity of items sold for a specific product ID
router.get("/items-sold", verifySignIn, async (req, res) => {
  const { _id, productId } = req.body;
  const user = await User.findById(_id);
  if (!user) {
    return res.status(422).json({ error: "Invalid user" });
  }
  if (user.type !== "manager") {
    return res.status(422).json({ error: "You are not authorized" });
  }

  try {
    // Query the database to find bills containing the specified product ID
    const bills = await Bill.find({ "billDetails.itemId": productId });

    // Calculate the total quantity of items sold for that product ID
    let totalQuantitySold = 0;
    let totalSoldPrice = 0;
    bills.forEach((bill) => {
      bill.billDetails.forEach((item) => {
        if (item.itemId === productId) {
          totalQuantitySold =
            parseInt(totalQuantitySold) + parseInt(item.quantity);
          totalSoldPrice =
            parseInt(totalSoldPrice) +
            parseInt(item.quantity) * parseInt(item.unitPrice);
        }
      });
    });

    // Return the quantity as the response
    res.json({ productId, totalQuantitySold, totalSoldPrice });
  } catch (error) {
    console.error("Error fetching data from database:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
