const mongoose = require("mongoose");

const stockSchema = mongoose.Schema({
  itemName: {
    type: "String",
    required: true,
  },
  itemQuantity: {
    type: "String",
    required: true,
  },
  itemType: {
    type: "String",
    required: true,
  },
  itemPrice: {
    type: "String",
    required: true,
  },
  itemImage: {
    type: "String",
    required: true,
  },
});

module.exports = mongoose.model("Stock", stockSchema);
