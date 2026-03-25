const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  name:    { type: String, required: true },
  image:   { type: String },
  price:   { type: Number, required: true },
  size:    { type: String },
  color:   { type: String },
  qty:     { type: Number, required: true, default: 1 },
});

const cartSchema = new mongoose.Schema(
  {
    user:  { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    items: [cartItemSchema],
  },
  { timestamps: true }
);

cartSchema.virtual('totalPrice').get(function () {
  return this.items.reduce((sum, item) => sum + item.price * item.qty, 0);
});

module.exports = mongoose.model('Cart', cartSchema);
