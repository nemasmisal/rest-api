const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const historyOrderSchema = new Schema({
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  totalAmount: {
    type: Number,
    required: true
  },
  order: [{
    type: String,
    require: true
  }]
}, { timestamps: { createdAt: 'created_at' } });

const HistoryOrder = mongoose.model('HistoryOrder', historyOrderSchema);

module.exports = HistoryOrder;
