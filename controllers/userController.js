const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = mongoose.model('User');

module.exports.registerPost = async (req, res) => {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const user = {
        name: req.body.fullName,
        email: req.body.email,
        password: hashedPassword,
        mobileNum: req.body.mobileNum,
        state: req.body.state,
        district: req.body.district,
        landmark: req.body.landMark,
        flatNum: req.body.flatNumber,
        pinCode: req.body.pinCode,
    };

    req.session.userData = user;

    res.redirect("/user/location");
}

module.exports.saveUser = async (req, res) => {
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
}

