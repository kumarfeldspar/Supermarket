const { timeStamp } = require("console");
const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0, //set the minimum value as required
  },
  itemId: {
    type: String,
    required: true,
    unique: true, // Ensure itemId is unique
  },
  photoUrl: {
    type: String,
    required: true,
  },
  timeStamp: {
    type: Date,
    default: Date.now, //current date and time
  },
});

mongoose.model("item", itemSchema); //can be accessed from anywhere in the application
