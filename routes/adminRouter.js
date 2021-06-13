const express = require("express");
const mongoose = require("mongoose");

const router = express.Router();
const path = require("path");
const app = express();

const Admin = mongoose.model("Admin");
const User = mongoose.model("User");
const ActiveOrder = mongoose.model("ActiveOrder");

router.get("/", (req, res) => {
  res.render("./admin/home", { username: req.session.username });
});

router.get("/logout", (req, res) => {
  req.session.username = null;
  res.redirect("/admin");
});

router.get("/login", (req, res) => {
  res.render("./admin/login");
});

router.post("/login", (req, res) => {
  if (req.body.username === "admin" && req.body.password === "admin@123") {
    req.session.username = "admin";
  }
  res.redirect("/admin");
});

router.get("/allOrders", (req, res) => {
  ActiveOrder.find({}, "userId orderId", async (err, result) => {
    if (err) return res.send("error");
    var allUsers = [];

    for (var i of result) {
      // console.log(i.orderId);

      const allrUsers = await User.find({ _id: i.userId });
      // console.log(allOrders);

      allUsers.push(allrUsers);
    }
    // console.log(allUsers);

    res.render("./admin/allOrders", { allUsers: allUsers });
  });
});

// router.get("/getUsers", (req, res) => {});

module.exports = router;
