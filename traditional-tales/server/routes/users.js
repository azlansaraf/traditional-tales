const express = require('express');
const router = express.Router();
const { updateProfile, toggleWishlist, getAllUsers } = require('../controllers/userController');
const { protect, admin } = require('../middleware/auth');

router.put('/profile',              protect, updateProfile);
router.post('/wishlist/:productId', protect, toggleWishlist);
router.get('/',                     protect, admin, getAllUsers);

module.exports = router;
