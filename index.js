const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const mongoose = require('mongoose');

require('./models/user.model')
require('./models/farmer.model')

const dotenv = require('dotenv');
const path = require("path");
const { urlencoded } = require("express");
const app = express();

// Getting routes
const userRouter = require('./routes/userRouter');

dotenv.config();

// setting db
mongoose.connect(process.env.DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('DB connected')
}).catch((err) => {
  console.log('Error connecting db');
  console.error(err);
});

// setting views
app.use(expressLayouts);
app.set("views", path.join(__dirname + "/views"));

app.set("view engine", "ejs");

//setting static files
app.use(express.static("public"));
app.use("/css", express.static(__dirname + "public/css"));
app.use("/images", express.static(__dirname + "public/images"));
app.use("/js", express.static(__dirname + "public/js"));

// s
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//setting paths
app.get("/", (req, res) => {
  res.render("home");
});

app.use("/user", userRouter);




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
