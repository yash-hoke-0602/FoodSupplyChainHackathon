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
        taluka: {
            type: 'String',
            required: true
        },
        landmark: {
            type: 'String',
            required: true
        },
        flat_no: {
            type: 'String',
            required: true
        }
    },

});

module.exports = mongoose.model('User', userSchema);

