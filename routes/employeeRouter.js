const express = require("express");
const mongoose = require("mongoose");

const router = express.Router();
const path = require("path");
const app = express();

const Stock = mongoose.model("Stock");

router.post("/addData", async (req, res) => {
  var newStock = new Stock();

  newStock.itemName = req.body.itemName;
  newStock.itemQuantity = req.body.itemQuantity;
  newStock.itemType = req.body.itemType;
  newStock.itemPrice = req.body.itemPrice;
  newStock.itemImage = req.body.itemImage;

  await newStock
    .save()
    .then(() => {
      // console.log("Stock Saved");
      res.send("Done");
    })
    .catch((err) => {
      // console.error(err);
      return res.send("Error saving stock" + err);
    });
});

module.exports = router;
