const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {
        type: 'String',
        required: true
    },
    email: {
        type: 'String',
        required: true,
        // alias: 'name.email'
    },
    mobileNum: {
        type: 'String',
        required: true
    },
    password: {
        type: 'String',
        required: true
    },
    address: {
        state: {
            type: 'String',
            required: true,
        },
        district: {
            type: 'String',
            required: true
        },
        landmark: {
            type: 'String',
            required: true
        },
        flatNum: {
            type: 'String',
            required: true
        },
        pinCode: {
            type: 'String',
            required: true
        }
    },
    lattitude: {
        type: 'String'
    },
    longitude: {
        type: 'String'
    }
});

module.exports = mongoose.model('User', userSchema);

