const Order = require('../models/Order');
const Cart = require('../models/Cart');

// @desc  Create order
// @route POST /api/orders
const createOrder = async (req, res) => {
  try {
    const { orderItems, shippingAddress, paymentMethod, itemsPrice, shippingPrice, totalPrice } = req.body;
    if (!orderItems || orderItems.length === 0)
      return res.status(400).json({ message: 'No order items' });

    const order = new Order({
      user: req.user._id,
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      shippingPrice,
      totalPrice,
    });
    const created = await order.save();

    // Clear cart after order
    await Cart.findOneAndUpdate({ user: req.user._id }, { items: [] });
    res.status(201).json(created);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc  Get order by ID
// @route GET /api/orders/:id
const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('user', 'firstName lastName email');
    if (!order) return res.status(404).json({ message: 'Order not found' });
    if (order.user._id.toString() !== req.user._id.toString() && req.user.role !== 'admin')
      return res.status(403).json({ message: 'Not authorized' });
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc  Get logged in user's orders
// @route GET /api/orders/myorders
const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc  Update order to paid
// @route PUT /api/orders/:id/pay
const updateOrderToPaid = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: 'Order not found' });
    order.isPaid = true;
    order.paidAt = Date.now();
    order.status = 'Processing';
    order.paymentResult = { id: req.body.id, status: req.body.status, updateTime: req.body.update_time };
    const updated = await order.save();
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc  Get all orders (admin)
// @route GET /api/orders
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate('user', 'firstName lastName email').sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc  Update order status (admin)
// @route PUT /api/orders/:id/status
const updateOrderStatus = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: 'Order not found' });
    order.status = req.body.status;
    if (req.body.status === 'Delivered') { order.isDelivered = true; order.deliveredAt = Date.now(); }
    const updated = await order.save();
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createOrder, getOrderById, getMyOrders, updateOrderToPaid, getAllOrders, updateOrderStatus };
