const express = require("express");
const router = express.Router();
const User = require("../models/user");
const Item = require("../models/item");
const verifySignIn = require("../middlewares/verifySignIn");

router.post("/changePrice", verifySignIn, async (req, res) => {
  try {
    const { _id, itemId, newPrice } = req.body;
    if (!itemId || !newPrice) {
      return res.status(422).json({ error: "Please add all the fields" });
    }
    const user = await User.findById(_id);
    if (!user) {
      return res.status(422).json({ error: "Invalid user" });
    }
    console.log(user.type);
    if (user.type !== "manager") {
      return res.status(422).json({ error: "You are not authorized" });
    }
    const item = await Item.findOne({ itemId });

    if (!item) {
      return res.status(422).json({ error: "Invalid item" });
    }
    item.price = parseInt(newPrice);
    await item.save();
    res.status(200).json(item);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
module.exports = router;
