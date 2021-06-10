const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const path = require('path');
const app = express();

const User = mongoose.model('User');

router.get('/', (req, res) => {
    console.log('fasfsaklfasdl');
    res.render('./user/home');
    // res.send('asdf')
});

router.get("/login", (req, res) => {
    res.render("./user/login");
});

router.post('/login', (req, res) => {
    res.render('./user/home')
});

router.get("/register", (req, res) => {
    console.log(req.body);
    res.render("./user/register");
});

router.post("/register", async (req, res) => {
    console.log(req.body.mobileNum);
    const user = {
        name: req.body.fullName,
        email: req.body.email,
        password: req.body.password,
        mobileNum: req.body.mobileNum,
        state: req.body.state,
        district: req.body.district,
        landmark: req.body.landMark,
        flatNum: req.body.flatNumber,
        pinCode: req.body.pinCode
    }
    console.log(user);
    var newUser = new User();

    newUser.name = user.name;
    newUser.email = user.email;
    newUser.password = user.password;
    newUser.mobileNum = user.mobileNum;
    newUser.address.state = user.state;
    newUser.address.district = user.district;
    newUser.address.landmark = user.landmark;
    newUser.address.flatNum = user.flatNum;
    newUser.address.pinCode = user.pinCode;

    console.log('new user', newUser);
    await newUser.save()
        .then(() => {
            console.log('User Saved');
        }).catch((err) => {
            console.error(err);
            return res.send('Error saving user' + err);
        });

    console.log('check');
    // now redirecting to get user location
    res.redirect('/user/location');
});

router.get("/location", (req, res) => {
    res.render("getCoordinates");
});

module.exports = router;