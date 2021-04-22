const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const orderSchema = new Schema({
    creator: {
        adress: {
            type: String,
            require: true
        },
        name: {
            type: String,
            require: true
        },
        phone: {
            type: Number,
            require: true
        }
    },
    totalAmount: {
        type: Number,
        required: true
    },
    articles: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Article'
    }]
}, { timestamps: { createdAt: 'created_at' } });

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
