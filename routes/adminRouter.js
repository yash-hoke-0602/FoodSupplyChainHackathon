const express = require("express");
const mongoose = require("mongoose");

const router = express.Router();
const path = require("path");
const app = express();

const Admin = mongoose.model("Admin");

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

module.exports = router;
