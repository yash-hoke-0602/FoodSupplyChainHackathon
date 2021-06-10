const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require('bcryptjs')

const router = express.Router();
const path = require("path");
const app = express();

const User = mongoose.model("User");

const userController = require('../controllers/userController');

const isUser = require('../other/isUser');

router.get("/", (req, res) => {
  if (req.session == null) user = "";
  else user = req.session.mobNum;
  return res.render("home", { user: user });
});

// render the login page
router.get("/login", (req, res) => {
  res.render("./user/login");
});

router.post("/login", (req, res) => {
  //authenticate user and store _id in session
  req.session.mobNum = req.body.username;
  res.redirect("/user/");
});

// render the register page
router.get("/register", (req, res) => {
  res.render("./user/register");
});

//logout user by destroying session
router.get("/logout", (req, res) => {
  req.session = null;
  res.redirect("/user");
});

//store all the posted data in session
router.post("/register", isUser.isUser, userController.registerPost);

//render map to get co-ordinates
router.get("/location", (req, res) => {
  res.render("getCoordinates");
});

//get lng and lat and rest of user data from session and store in DB
router.get("/saveUser/:lng/:lat", userController.saveUser);

module.exports = router;
