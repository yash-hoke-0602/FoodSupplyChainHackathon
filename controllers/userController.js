const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = mongoose.model('User');

module.exports.registerPost = async (req, res) => {


    if (await User.findOne({ mobileNum: req.body.mobileNum })) {
        return res.render('./user/register', { msg: 'Mobile Number exists. Please try with another mobile number.' });
    }

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

module.exports.loginPost = async (req, res) => {
    const mobileNum = req.body.username;
    const password = req.body.password;

    const user = await User.findOne({ mobileNum: mobileNum });

    const is_valid = await bcrypt.compare(password, user.password);

    if (user && is_valid) {
        // if user is valid session is begun
        req.session.mobileNum = mobileNum;
    }
    else {
        return res.render('./user/login', { msg: 'Please enter a valid number or password.' })
    }

    res.redirect('/user');
}
