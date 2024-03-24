const mongoose = require("mongoose");
const { timeStamp } = require("console");

const billSchema = new mongoose.Schema({
  billNumber: {
    type: String,
    required: true,
    unique: true,
  },
  totalAmount: {
    type: Number,
    required: true,
    min: 0,
  },
  timeStamp: {
    type: Date,
    default: Date.now,
  },
  billDetails: [
    {
      nameOfItem: {
        type: String,
        required: true,
      },
      itemId: {
        type: String,
        required: true,
      },
      unitPrice: {
        type: Number,
        required: true,
        min: 0,
      },
      quantity: {
        type: Number,
        required: true,
        min: 0,
      },
      itemPrice: {
        type: Number,
        required: true,
        min: 0,
      },
    },
  ],
});

module.exports = mongoose.model("bill", billSchema);
