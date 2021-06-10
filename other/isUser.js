const mongoose = require('mongoose');
const User = mongoose.model('User');

module.exports.isUser = (req, res, next) => {
    const user = User.findOne({ mobileNum: req.body.mobileNum });
    if (user) {
        return res.render('./user/register', { msg: 'Mobile Number exists. Please try with another mobile number.' });
    }
}
