const mongoose = require("mongoose");

const countSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    enum: ["bill", "item"],
    unique: true,
  },
  count: {
    type: Number,
    required: true,
    default: 1,
  },
});

module.exports = mongoose.model("Count", countSchema);
