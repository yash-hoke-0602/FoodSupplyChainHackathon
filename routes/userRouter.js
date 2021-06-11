const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const router = express.Router();
const path = require("path");
const app = express();

const User = mongoose.model("User");
const Stock = mongoose.model("Stock");

const userController = require("../controllers/userController");

const isLoggedIn = require("../other/isLoggedIn");

router.get("/", isLoggedIn, async (req, res) => {
  // mobileNum is enough for identifying the user
  mobileNum = req.session.mobileNum;
  const user = await User.findOne({ mobileNum: mobileNum }).catch((err) =>
    console.error(err)
  );

  return res.render("home", { user: user });
});

// render the login page
router.get("/login", (req, res) => {
  res.render("./user/login");
});

router.post("/login", userController.loginPost);

// render the register page
router.get("/register", (req, res) => {
  res.render("./user/register");
});

//store all the posted data in session
router.post("/register", userController.registerPost);

//logout user by destroying session
router.get("/logout", (req, res) => {
  req.session = null;
  res.redirect("/user");
});

//render map to get co-ordinates
router.get("/location", (req, res) => {
  res.render("getCoordinates");
});

//get lng and lat and rest of user data from session and store in DB
router.get("/saveUser/:lng/:lat", userController.saveUser);

router.get("/order", (req, res) => {
  Stock.find({}, (err, result) => {
    if (err) return res.send("error");
    res.render("./user/menuPage", { result: result });
  });
});

router.post("/order/bill", (req, res) => {
  //console.log(req.body);
  req.session.body = req.body;
});

router.get("/order/bill", (req, res) => {
  //var bill = req.session.bill;
  // console.log(req.session);
  // for (var i in bill) {
  //   console.log("id", i.price);
  // }
  res.render("./user/bill", { title: "bill" });
});

module.exports = router;
