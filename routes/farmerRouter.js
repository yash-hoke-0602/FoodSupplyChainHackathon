const mongoose = require('mongoose')
const express = require('express')
const router = express.Router();

const farmerController = require('../controllers/farmerController')

router.get('/login', farmerController.getLogin);
router.get('/register', farmerController.getRegister);

module.exports = router;



