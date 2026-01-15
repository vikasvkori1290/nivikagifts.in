const express = require('express');
const router = express.Router();
const { getOrders, updateOrderStatus } = require('../controllers/orderController');

router.get('/', getOrders);
router.put('/:id/status', updateOrderStatus);

module.exports = router;
