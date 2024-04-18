const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("../helper/bcrypt");
const jwt = require("../helper/jwt");
const Item = require("../models/item");

router.get("/", (req, res) => {
  res.send("hello from app.js");
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
    res.status(200).json({ token, type: user.type });
    //in json files for eg we have to write type etc
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" }); //when data entered is wrong format or incorrect
  }
});

router.post("/item", async (req, res) => {
  const item = await Item.find({});
  res.json(item);
});

module.exports = router;
