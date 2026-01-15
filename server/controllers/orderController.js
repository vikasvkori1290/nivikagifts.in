const mongoose = require('mongoose');
const Order = require('../models/Order');

// GET all orders
exports.getOrders = async (req, res) => {
    // INSTANT FALLBACK: Check DB connection
    if (mongoose.connection.readyState !== 1) {
        console.warn("DB not connected. Serving instant mock orders.");
        return res.status(200).json(require('../data/mockOrders'));
    }

    try {
        const orders = await Order.find().populate('items.product').sort({ createdAt: -1 });
        res.status(200).json(orders);
    } catch (error) {
        console.warn("Database error, serving mock orders:", error.message);
        res.status(200).json(require('../data/mockOrders'));
    }
};

// UPDATE order status
exports.updateOrderStatus = async (req, res) => {
    // INSTANT FALLBACK: Check DB connection
    if (mongoose.connection.readyState !== 1) {
        return res.status(503).json({ message: "Cannot update orders: Database disconnected (Mock Mode)" });
    }

    try {
        const { status } = req.body;
        const order = await Order.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true }
        );

        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        res.status(200).json(order);
    } catch (error) {
        console.error("Error updating order:", error);
        res.status(500).json({ message: 'Server Error' });
    }
};
