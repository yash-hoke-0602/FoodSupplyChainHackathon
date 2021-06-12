const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  orderId: {
    type: "String",
    required: true,
  },
});

module.exports = mongoose.model("ActiveOrder", orderSchema);
