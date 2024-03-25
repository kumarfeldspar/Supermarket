const express = require("express");
const router = express.Router();
const User = require("../models/user");
const Count = require("../models/count");
const Bill = require("../models/bill");
const Item = require("../models/item");
const bcrypt = require("../helper/bcrypt");
const jwt = require("../helper/jwt");
const verifySignIn = require("../middlewares/verifySignIn");

router.post("/updateQuantity", verifySignIn, async (req, res) => {
  try {
    const { itemId, quantity } = req.body;
    if (!itemId || !quantity) {
      return res.status(422).json({ error: "Please add all the fields" });
    }
    const item = await Item.findOne({ itemId });
    console.log("3");
    if (!item) {
      return res.status(422).json({ error: "Invalid item" });
    }
    item.quantity = parseInt(item.quantity) + parseInt(quantity);
    await item.save();
    res.status(200).json(item);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
