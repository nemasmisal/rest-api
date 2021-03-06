const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    admin: {
        type: Boolean,
        default: false
    },
    basket: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Article'
    }],
    favorites: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Article'
    }],
    orders: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Article'
    }]
});

const User = mongoose.model('User', userSchema);

module.exports = User;
