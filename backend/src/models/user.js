const { timeStamp } = require("console");
const mongoose = require("mongoose");
const { type } = require("os");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true, // Ensure email is unique
  },
  password: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
    enum: ["employee", "manager", "clerk"],
  },
});

mongoose.model("user", userSchema); //can be accessed from anywhere in the application
