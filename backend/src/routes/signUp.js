const express = require("express");
const router = express.Router();
const User = require("../models/user");
const Count = require("../models/count");
const Bill = require("../models/bill");
const Item = require("../models/item");
const bcrypt = require("../helper/bcrypt");
const jwt = require("../helper/jwt");
const verifySignIn = require("../middlewares/verifySignIn");


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

//_id is the id of the user
//what details can we know from _id?
//we can know the type of the user

module.exports = router;
