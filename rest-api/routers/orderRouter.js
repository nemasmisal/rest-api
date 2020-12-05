const router = require('express').Router();
const orderController = require('../controllers/orderController');

router.get('/orders', orderController.getOrders);
router.get('/orders/aprove/:id', orderController.aproveOrder);
router.get('/historyOrders', orderController.getHistoryOrders);
module.exports = router;