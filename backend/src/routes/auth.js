const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const user = mongoose.model("user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Jwt_secret } = require("../keys");
const requireLogin = require("../middlewares/requireLogin");

router.get("/", (req, res) => {
  res.send("hello");
});

router.post("/signup", (req, res) => {
  const { name, userName, email, password } = req.body;
  if (!name || !email || !userName || !password) {
    return res.status(422).json({ error: "Please add all the fields" });
  }
  user
    .findOne({ $or: [{ email: email }, { userName: userName }] })
    .then((saveduser) => {
      if (saveduser) {
        return res
          .status(422)
          .json({ error: "user already exist with that email or userName" });
      }
      bcrypt.hash(password, 12).then((hashedPassword) => {
        const user = new user({
          name,
          email,
          userName,
          password: hashedPassword,
        });

        user
          .save()
          .then((user) => {
            res.json({ message: "Registered successfully" });
          })
          .catch((err) => {
            console.log(err);
          });
      });
    });
});

router.post("/signin", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(422).json({ error: "Please add email and password" });
  }
  user.findOne({ email: email }).then((saveduser) => {
    if (!saveduser) {
      return res.status(422).json({ error: "Invalid email" });
    }
    bcrypt
      .compare(password, saveduser.password)
      .then((match) => {
        if (match) {
          // return res.status(200).json({ message: "Signed in Successfully" })
          const token = jwt.sign({ _id: saveduser.id }, Jwt_secret);
          const { _id, name, email, userName } = saveduser;
          //   console.log(token);

          res.json({ token, user: { _id, name, email, userName } });

          console.log({ token, user: { _id, name, email, userName } });
        } else {
          return res.status(422).json({ error: "Invalid password" });
        }
      })
      .catch((err) => console.log(err));
  });
});

module.exports = router;
