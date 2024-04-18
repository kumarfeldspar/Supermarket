const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    itemId: {
      type: String,
      required: true,
      unique: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 0,
    },
    photoUrl: {
      type: String,
      required: true,
    },
    expiry: {
      type: Date, // Date field for expiry
      required: false, // Expiry may not be applicable for all items
    },
    isDiscounted: {
      type: Boolean,
      default: false, // By default, no discount is applied
    },
    discount: {
      type: Number,
      required: false,
      min: 0,
      max: 100, // Discount should be in percentage
    },
    discountDuration: {
      type: Number, // Duration for which the discount is applicable (in days)
      required: false,
      min: 0,
    },
  },
  {
    timestamps: true, // Corrected 'timestamp' to 'timestamps'
  }
);

module.exports = mongoose.model("Item", itemSchema);
