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
    basket: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Article'
    }],
    favorites: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Article'
    }],
    admin: {
        type: Boolean,
        required: true
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
