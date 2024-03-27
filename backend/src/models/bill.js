const mongoose = require("mongoose");

const billSchema = new mongoose.Schema(
  {
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
    billDetails: [
      {
        name: {
          type: String,
          required: true,
        },
        itemId: {
          type: String,
          required: true,
        },
        unitPrice: {
          type: Number,
          // required: true,
          min: 0,
        },
        quantity: {
          type: Number,
          required: true,
          min: 0,
        },
        itemPrice: {
          type: Number,
          // required: true,
          min: 0,
          default: function () {
            return this.unitPrice * this.quantity;
          },
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Bill", billSchema);
