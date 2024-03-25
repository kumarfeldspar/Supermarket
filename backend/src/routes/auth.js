const express = require("express");
const router = express.Router();
const User = require("../models/user");
const Count = require("../models/count");
const Bill = require("../models/bill");
const Item = require("../models/item");
const bcrypt = require("../helper/bcrypt");
const jwt = require("../helper/jwt");
const verifySignIn = require("../middlewares/verifySignIn");

router.get("/", (req, res) => {
  res.send("hello from app.js");
});
//database query is async and async is written in try catch
//as if it goes wrong the server would crash
router.post("/signup", async (req, res) => {
  try {
    const { name, type, email, password } = req.body;
    if (!name || !email || !type || !password) {
      return res.status(422).json({ error: "Please add all the fields" });
    }
    const newPassword = await bcrypt.hash(password);
    const user = new User({
      name,
      email,
      type,
      password: newPassword,
    });
    await user.save();
    res.status(200).json({ message: "Registered successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" }); //when data entered is wrong format or incorrect
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(422).json({ error: "Please add email and password" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(422).json({ error: "Invalid email or password" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(422).json({ error: "Invalid email or password" });
    }
    const token = jwt.generateToken({ _id: user._id }); //in mongoDB _id is the unique id of the user
    res.status(200).json({ token });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" }); //when data entered is wrong format or incorrect
  }
});

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

//_id is the id of the user
//what details can we know from _id?
//we can know the type of the user
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
