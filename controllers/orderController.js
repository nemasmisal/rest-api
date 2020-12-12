const Order = require('../models/orderModel');
const HistoryOrder = require('../models/historyOrderModel');

module.exports = {

  async getOrders(req, res, next) {
    try {
      const orders = await Order.find({}).populate(['articles', 'creator']).lean();
      if (!orders) { return res.status(400).send({ msg: 'Order with provided ID do not exist.' }) }
      res.send(orders);
    } catch (error) { res.status(400).send({ msg: 'Order with provided ID do not exist.' }) }
  },
  async aproveOrder(req, res, next) {
    try {
      const orderId = req.params.id;
      const articles = await Order.find({ _id: orderId }).populate('articles').lean();
      const articleNames = articles[0].articles.reduce((acc, curr) => { acc.push(curr.name); return acc }, []);
      const doc = await Order.findByIdAndRemove(orderId)
      const historyOrder = new HistoryOrder({ creator: doc.creator, order: articleNames, totalAmount: doc.totalAmount })
      await historyOrder.save();
      res.status(202).send({ msg: 'Order was successfully accepted.' })
    } catch (error) {
      res.status(400).send({ msg: 'Order with provided ID do not exist.' })
    }
  },
  async getHistoryOrders(req, res, next) {
    try {
      const historyOrders = await HistoryOrder.find({});
      if (!historyOrders) { return res.status(400).send({ msg: 'No history of orders' }); }
      res.send(historyOrders);
    } catch (error) { return res.status(400).send({ msg: 'No history of orders' }); }
  }
}