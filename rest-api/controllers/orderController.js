const Order = require('../models/orderModel');
const HistoryOrder = require('../models/historyOrderModel');

module.exports = {

  async getOrders(req, res, next) {
    const orders = await Order.find({}).populate(['articles', 'creator']).lean();
    if (!orders) { return res.status(507).send({ msg: 'The method could not be performed on the resource because the server is unable to store the representation needed to successfully complete the request.' }) }
    res.send(orders);
  },
  async aproveOrder(req, res, next) {
    try {
      const orderId = req.params.id;
      const articles = await Order.find({ _id: orderId }).populate('articles').lean();
      const articleNames = articles[0].articles.reduce((acc, curr) => { acc.push(curr.name); return acc }, []);
      await Order.findByIdAndRemove(orderId, async (err, doc) => {
        const historyOrder = new HistoryOrder({ creator: doc.creator, order: articleNames, totalAmount: doc.totalAmount })
        await historyOrder.save();
      })
    } catch (error) {
      console.log(error);
    }
  },
  async getHistoryOrders(req, res, next) {
    const historyOrders = await HistoryOrder.find({});
    if (!historyOrders) { return res.status(507).send({ msg: 'The method could not be performed on the resource because the server is unable to store the representation needed to successfully complete the request.' }) }
    res.send(historyOrders);
  }
}