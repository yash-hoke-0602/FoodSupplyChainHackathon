const mongoose = require('mongoose')

module.exports.getLogin = (req, res) => {
    res.render('./farmer/login');
}

module.exports.getRegister = (req, res) => {
    res.render('./farmer/register');
}