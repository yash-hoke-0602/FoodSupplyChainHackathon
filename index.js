const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const path = require("path");
const app = express();

// setting views
app.use(expressLayouts);
app.set("views", path.join(__dirname + "/views"));
app.set("view engine", "ejs");

//setting static files
app.use(express.static("public"));
app.use("/css", express.static(__dirname + "public/css"));
app.use("/images", express.static(__dirname + "public/images"));
app.use("/js", express.static(__dirname + "public/js"));

//setting paths
app.get("/", (req, res) => {
  res.render("home");
});

app.get("/login", (req, res) => {
  res.render("login", { Title: "Login" });
});

app.get("/register", (req, res) => {
  res.render("register", { Title: "Register" });
});

app.post("/register/location", (req, res) => {
  res.render("getCoordinates");
});

app.get("/register/location/:lng/:lat", (req, res) => {
  console.log(req.params.lng);
  console.log(req.params.lat);
  res.redirect("/login");
}); 

app.get("/geoCoder", (req, res) => {
  res.render("geoCoder");
});

const PORT = 3333;
app.listen(PORT, () => console.log("Listening on 3333"));
