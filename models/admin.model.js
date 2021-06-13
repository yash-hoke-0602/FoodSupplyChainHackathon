const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  userName: {
    type: "String",
    required: true,
    // alias: 'name.email'
  },
  password: {
    type: "String",
    required: true,
  },
});

module.exports = mongoose.model("Admin", userSchema);
