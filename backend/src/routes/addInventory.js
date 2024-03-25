const express = require("express");
const router = express.Router();
const User = require("../models/user");
const Count = require("../models/count");
const Item = require("../models/item");
const verifySignIn = require("../middlewares/verifySignIn");

router.post("/addInventory", verifySignIn, async (req, res) => {
  // console.log("second");
  try {
    const { _id, name, price, quantity, photoUrl } = req.body;
    const user = await User.findById(_id);
    if (!user) {
      return res.status(422).json({ error: "Invalid user" });
    }
    console.log(user.type);
    if (user.type !== "employee") {
      return res.status(422).json({ error: "You are not authorized" });
    }
    const itemData = await Count.findOne({ type: "item" });
    let itemId = 1;
    if (!itemData) {
      const count = new Count({
        type: "item",
        count: 2,
      });
      await count.save();
    } else {
      itemId = itemData.count;
      itemData.count = parseInt(itemData.count) + 1;
      await itemData.save();
    }

    const item = new Item({
      name,
      price,
      quantity,
      photoUrl,
      itemId,
    });
    await item.save();
    res.status(200).json({ message: "Item added successfully", item });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
module.exports = router;
