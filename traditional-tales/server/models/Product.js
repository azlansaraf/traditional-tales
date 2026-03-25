const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema(
  {
    user:    { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    name:    { type: String, required: true },
    rating:  { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, required: true },
  },
  { timestamps: true }
);

const productSchema = new mongoose.Schema(
  {
    name:        { type: String, required: true, trim: true },
    description: { type: String, required: true },
    category:    {
      type: String,
      required: true,
      enum: ['Classic Abayas', 'Embroidered', 'Burkhas', 'Occasion Wear', 'Accessories'],
    },
    price:       { type: Number, required: true, min: 0 },
    oldPrice:    { type: Number, default: null },
    badge:       { type: String, enum: ['New', 'Sale', null], default: null },
    images:      [{ type: String }],
    sizes:       [{ type: String }],
    colors:      [{ type: String }],
    countInStock:{ type: Number, required: true, default: 0 },
    reviews:     [reviewSchema],
    rating:      { type: Number, default: 0 },
    numReviews:  { type: Number, default: 0 },
    featured:    { type: Boolean, default: false },
    material:    { type: String },
    care:        { type: String, default: 'Dry clean only' },
    sku:         { type: String, unique: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Product', productSchema);
