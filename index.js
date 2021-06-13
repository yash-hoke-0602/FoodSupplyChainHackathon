const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");

require("./models/user.model");
require("./models/admin.model");
require("./models/farmer.model");
require("./models/stock.model");
require("./models/activeOrders.model");
require("./models/orderDetail");

const isLoggedIn = require("./other/isLoggedIn");

const cors = require("cors");
const corsOptions = {
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

const dotenv = require("dotenv");
const path = require("path");
const app = express();

app.use(cors(corsOptions));

// Getting routes
const adminRouter = require("./routes/adminRouter");
const userRouter = require("./routes/userRouter");
const employeeRouter = require("./routes/employeeRouter");
const farmerRouter = require("./routes/farmerRouter");

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

app.set("views", path.join(__dirname + "/views"));

app.set("view engine", "ejs");

//setting static files
app.use(express.static("public"));
app.use("/css", express.static(__dirname + "public/css"));
app.use("/images", express.static(__dirname + "public/images"));
app.use("/js", express.static(__dirname + "public/js"));
app.use("/webfonts", express.static(__dirname + "public/webfonts"));

// s
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieSession({ secret: "qwertyuioasdfghjkxcvbnm" }));

app.use("/admin", adminRouter);
app.use("/user", userRouter);
app.use("/employee", employeeRouter);
app.use("/farmer", farmerRouter);

//setting paths
app.get("/", (req, res) => {
  res.render("landingPage");
});

const PORT = 3333;
app.listen(PORT, () => console.log("Listening on 3333"));
