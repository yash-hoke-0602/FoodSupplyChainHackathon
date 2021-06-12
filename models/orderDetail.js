const mongoose = require("mongoose");

const orderDetailSchema = mongoose.Schema({
  orderId: {
    type: "String",
    required: true,
  },
  itemName: {
    type: "String",
    required: true,
  },
  itemPrice: {
    type: "String",
    required: true,
  },
  itemQuantity: {
    type: "String",
    required: true,
  },
});

module.exports = mongoose.model("OrderDetail", orderDetailSchema);
