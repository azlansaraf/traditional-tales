const Product = require('../models/Product');

// @desc  Get all products (with filter/search/pagination)
// @route GET /api/products
const getProducts = async (req, res) => {
  try {
    const { category, search, badge, page = 1, limit = 12 } = req.query;
    const query = {};
    if (category && category !== 'All') query.category = category;
    if (badge) query.badge = badge;
    if (search) query.name = { $regex: search, $options: 'i' };

    const total = await Product.countDocuments(query);
    const products = await Product.find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    res.json({ products, total, page: Number(page), pages: Math.ceil(total / limit) });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc  Get single product
// @route GET /api/products/:id
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc  Get featured products
// @route GET /api/products/featured
const getFeatured = async (req, res) => {
  try {
    const products = await Product.find({ featured: true }).limit(8);
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc  Create product (admin)
// @route POST /api/products
const createProduct = async (req, res) => {
  try {
    const product = new Product({ ...req.body, sku: 'TT-' + Date.now() });
    const created = await product.save();
    res.status(201).json(created);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc  Update product (admin)
// @route PUT /api/products/:id
const updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc  Delete product (admin)
// @route DELETE /api/products/:id
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json({ message: 'Product removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc  Add review
// @route POST /api/products/:id/reviews
const addReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    const alreadyReviewed = product.reviews.find(
      r => r.user.toString() === req.user._id.toString()
    );
    if (alreadyReviewed) return res.status(400).json({ message: 'Product already reviewed' });

    product.reviews.push({
      user: req.user._id,
      name: `${req.user.firstName} ${req.user.lastName}`,
      rating: Number(rating),
      comment,
    });
    product.numReviews = product.reviews.length;
    product.rating = product.reviews.reduce((a, r) => a + r.rating, 0) / product.reviews.length;
    await product.save();
    res.status(201).json({ message: 'Review added' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getProducts, getProductById, getFeatured, createProduct, updateProduct, deleteProduct, addReview };
