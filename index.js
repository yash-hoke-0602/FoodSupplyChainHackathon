const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const cors = require("cors");

require("./models/user.model");
require("./models/farmer.model");
require("./models/stock.model");

const dotenv = require("dotenv");
const path = require("path");
const { urlencoded } = require("express");
const app = express();

// Getting routes
const userRouter = require("./routes/userRouter");
const employeeRouter = require("./routes/employeeRouter");

dotenv.config();

// setting db
mongoose
  .connect(process.env.DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB connected");
  })
  .catch((err) => {
    console.log("Error connecting db");
    console.error(err);
  });

// setting views
app.use(expressLayouts);
app.use(
  cors({
    methods: ["GET", "POST"], //essential for cookie
    credentials: true,
  })
);
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
app.use(cookieSession({ secret: "qwertyuioasdfghjkxcvbnm" }));

app.use("/user", userRouter);
app.use("/employee", employeeRouter);

//setting paths
app.get("/", (req, res) => {
  res.render("home");
});

const PORT = 3333;
app.listen(PORT, () => console.log("Listening on 3333"));
