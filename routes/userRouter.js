const express = require("express");
const mongoose = require("mongoose");

const router = express.Router();
const path = require("path");
const app = express();

const User = mongoose.model("User");

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
router.post("/register", async (req, res) => {
  const user = {
    name: req.body.fullName,
    email: req.body.email,
    password: req.body.password,
    mobileNum: req.body.mobileNum,
    state: req.body.state,
    district: req.body.district,
    landmark: req.body.landMark,
    flatNum: req.body.flatNumber,
    pinCode: req.body.pinCode,
  };

  req.session.userData = user;

  res.redirect("/user/location");
});

//render map to get co-ordinates
router.get("/location", (req, res) => {
  res.render("getCoordinates");
});

//get lng and lat and rest of user data from session and store in DB
router.get("/saveUser/:lng/:lat", async (req, res) => {
  var newUser = new User();

  newUser.name = req.session.userData.name;
  newUser.email = req.session.userData.email;
  newUser.password = req.session.userData.password;
  newUser.mobileNum = req.session.userData.mobileNum;
  newUser.address.state = req.session.userData.state;
  newUser.address.district = req.session.userData.district;
  newUser.address.landmark = req.session.userData.landmark;
  newUser.address.flatNum = req.session.userData.flatNum;
  newUser.address.pinCode = req.session.userData.pinCode;
  newUser.lattitude = req.params.lat;
  newUser.longitude = req.params.lng;

  req.session = null;
  await newUser
    .save()
    .then(() => {
      console.log("User Saved");
    })
    .catch((err) => {
      console.error(err);
      return res.send("Error saving user" + err);
    });

  res.redirect("/user/login");
});

module.exports = router;
