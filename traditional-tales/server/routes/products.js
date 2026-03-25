const express = require('express');
const router = express.Router();
const {
  getProducts, getProductById, getFeatured,
  createProduct, updateProduct, deleteProduct, addReview
} = require('../controllers/productController');
const { protect, admin } = require('../middleware/auth');

router.get('/',           getProducts);
router.get('/featured',   getFeatured);
router.get('/:id',        getProductById);
router.post('/',          protect, admin, createProduct);
router.put('/:id',        protect, admin, updateProduct);
router.delete('/:id',     protect, admin, deleteProduct);
router.post('/:id/reviews', protect, addReview);

module.exports = router;
