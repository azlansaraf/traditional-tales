const User = require('../models/User');

// @desc  Update user profile
// @route PUT /api/users/profile
const updateProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    user.firstName = req.body.firstName || user.firstName;
    user.lastName  = req.body.lastName  || user.lastName;
    user.email     = req.body.email     || user.email;
    if (req.body.password) user.password = req.body.password;
    const updated = await user.save();
    res.json({ _id: updated._id, firstName: updated.firstName, lastName: updated.lastName, email: updated.email, role: updated.role });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc  Toggle wishlist item
// @route POST /api/users/wishlist/:productId
const toggleWishlist = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const productId = req.params.productId;
    const index = user.wishlist.indexOf(productId);
    if (index === -1) user.wishlist.push(productId);
    else user.wishlist.splice(index, 1);
    await user.save();
    res.json({ wishlist: user.wishlist });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc  Get all users (admin)
// @route GET /api/users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password').sort({ createdAt: -1 });
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { updateProfile, toggleWishlist, getAllUsers };
