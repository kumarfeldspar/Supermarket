const express = require("express");
const router = express.Router();
const User = require("../models/user");
const Count = require("../models/count");
const Bill = require("../models/bill");
const Item = require("../models/item");
const bcrypt = require("../helper/bcrypt");
const jwt = require("../helper/jwt");
const verifySignIn = require("../middlewares/verifySignIn");
const { configDotenv } = require("dotenv");
const { get } = require("http");
const { jsPDF } = require("jspdf"); // will automatically load the node version

router.post("/generateBill", verifySignIn, async (req, res) => {
  try {
    const { _id, billDetails } = req.body;
    console.log(billDetails);
    if (!_id || !billDetails) {
      return res
        .status(422)
        .json({ error: "Please provide user ID and bill details" });
    }
    console.log(billDetails);
    const user = await User.findById(_id);
    if (!user) {
      return res.status(422).json({ error: "Invalid user" });
    }

    if (user.type !== "clerk") {
      return res.status(422).json({ error: "You are not authorized" });
    }

    let totalPrice = 0;
    // console.log(totalPrice);
    for (let i = 0; i < billDetails.length; i++) {
      const item = await Item.findOne({ itemId: billDetails[i].itemId });
      if (!item) {
        return res.status(422).json({ error: "Invalid item" });
      }
      billDetails[i].name = item.name;
      billDetails[i].itemPrice =
        parseInt(item.price) * parseInt(billDetails[i].quantity);
      billDetails[i].unitPrice = parseInt(item.price);
      if (item.quantity < billDetails[i].quantity) {
        return res.status(422).json({ error: "Quantity not available" });
        ``;
      }
      //   console.log(
      //     totalPrice + " " + item.price + " " + billDetails[i].quantity
      //   );
      totalPrice =
        parseInt(totalPrice) +
        parseInt(billDetails[i].quantity) * parseInt(item.price);
      item.quantity -= parseInt(billDetails[i].quantity);
      console.log(totalPrice);
      await item.save();
    }

    console.log(totalPrice);
    const billData = await Count.findOne({ type: "bill" });
    let billId = 1;
    if (billData) {
      billId = billData.count;
      billData.count = parseInt(billData.count) + 1;
      await billData.save();
    } else {
      const count = new Count({
        type: "bill",
        count: 2,
      });
      await count.save();
    }

    const newBill = new Bill({
      billNumber: billId,
      totalAmount: parseInt(totalPrice),
      billDetails,
    });
    await newBill.save();
    res.status(200).json(newBill);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
