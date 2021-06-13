const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const { v4: uuidv4 } = require("uuid");

const router = express.Router();
const path = require("path");
const app = express();

const OrderDetail = mongoose.model("OrderDetail");
const User = mongoose.model("User");
const ActiveOrder = mongoose.model("ActiveOrder");
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
router.get("/location", isLoggedIn, (req, res) => {
  res.render("getCoordinates");
});

//get lng and lat and rest of user data from session and store in DB
router.get("/saveUser/:lng/:lat", isLoggedIn, userController.saveUser);

router.get("/order", isLoggedIn, (req, res) => {
  Stock.find({}, (err, result) => {
    if (err) return res.send("error");
    res.render("./user/menuPage", { result: result });
  });
});

router.post("/order/cart", isLoggedIn, (req, res) => {
  req.session.cart = req.body;
  // console.log("session", req.session.cart);
  res.send({ msg: "Done" });
});

router.get("/order/bill", isLoggedIn, (req, res) => {
  console.log("next page", req.session.cart);
  var bill = req.session.cart;
  // console.log(req.session);
  // for (var i in bill) {
  //   console.log("id", bill[i]);
  // }
  res.render("./user/bill", { bill: bill });
});

router.get("/order/bill/cancel", isLoggedIn, (req, res) => {
  req.session.cart = null;
  res.redirect("/user/order");
});

router.get("/order/bill/placeOrder", isLoggedIn, async (req, res) => {
  //send Data to active orders
  userMob = req.session.mobileNum;
  const user = await User.findOne({ mobileNum: userMob });
  const orderId = uuidv4();
  console.log(orderId);

  var newOrder = new ActiveOrder();
  newOrder.userId = user._id;
  newOrder.orderId = orderId;

  await newOrder
    .save()
    .then(() => {
      console.log("Order Saved");
    })
    .catch((err) => {
      console.error(err);
      return res.send("Error saving user" + err);
    });

  var orders = req.session.cart;

  var orderDetail = new OrderDetail();

  for (var i in orders) {
    OrderDetail.create(
      {
        orderId: orderId,
        itemName: orders[i].name,
        itemPrice: orders[i].price,
        itemQuantity: orders[i].count,
      },
      (err, res) => {
        if (err) return res.send(err);
        console.log("added");
      }
    );
  }

  req.session.cart = null;
  res.redirect("/user");
});

router.get("/myOrders", isLoggedIn, async (req, res) => {
  const userMob = req.session.mobileNum;
  const user = await User.findOne({ mobileNum: userMob });
  const userId = user._id;

  //const order = await User.findOne({ mobileNum: userMob });
  ActiveOrder.find({ userId: userId }, "orderId", async (err, result) => {
    if (err) return res.send("error");
    var allOrders = [];

    for (var i of result) {
      // console.log(i.orderId);

      const allOrdersDetails = await OrderDetail.find({ orderId: i.orderId });
      // console.log(allOrders);

      allOrders.push(allOrdersDetails);
    }
    console.log(allOrders);

    res.render("./user/myOrders", { allOrders: allOrders });
  });
});

router.get("/cancelOrder/:orderId", isLoggedIn, async (req, res) => {
  ActiveOrder.deleteOne({ orderId: req.params.orderId }, (err) => {
    if (err) return res.send(err);
    console.log(" order deleted");
  });

  OrderDetail.deleteMany({ orderId: req.params.orderId }, (err) => {
    if (err) return res.send(err);
    console.log(" orderDetails deleted");
  });

  res.redirect("/user/myOrders");
});

module.exports = router;
