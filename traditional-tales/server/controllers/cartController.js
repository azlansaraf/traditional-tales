const Cart = require('../models/Cart');
const Product = require('../models/Product');

// @desc  Get cart
// @route GET /api/cart
const getCart = async (req, res) => {
  try {
    let cart = await Cart.findOne({ user: req.user._id }).populate('items.product', 'name images price countInStock');
    if (!cart) cart = await Cart.create({ user: req.user._id, items: [] });
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc  Add item to cart
// @route POST /api/cart
const addToCart = async (req, res) => {
  try {
    const { productId, qty, size, color } = req.body;
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    if (product.countInStock < qty) return res.status(400).json({ message: 'Not enough stock' });

    let cart = await Cart.findOne({ user: req.user._id });
    if (!cart) cart = new Cart({ user: req.user._id, items: [] });

    const existingIndex = cart.items.findIndex(
      i => i.product.toString() === productId && i.size === size && i.color === color
    );

    if (existingIndex >= 0) {
      cart.items[existingIndex].qty += qty;
    } else {
      cart.items.push({ product: productId, name: product.name, image: product.images[0], price: product.price, size, color, qty });
    }
    await cart.save();
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc  Update cart item qty
// @route PUT /api/cart/:itemId
const updateCartItem = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart) return res.status(404).json({ message: 'Cart not found' });
    const item = cart.items.id(req.params.itemId);
    if (!item) return res.status(404).json({ message: 'Item not found' });
    item.qty = req.body.qty;
    if (item.qty <= 0) cart.items.pull(req.params.itemId);
    await cart.save();
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc  Remove item from cart
// @route DELETE /api/cart/:itemId
const removeFromCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart) return res.status(404).json({ message: 'Cart not found' });
    cart.items.pull(req.params.itemId);
    await cart.save();
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc  Clear cart
// @route DELETE /api/cart
const clearCart = async (req, res) => {
  try {
    await Cart.findOneAndUpdate({ user: req.user._id }, { items: [] });
    res.json({ message: 'Cart cleared' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getCart, addToCart, updateCartItem, removeFromCart, clearCart };
