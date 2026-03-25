const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
  product:  { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  name:     { type: String, required: true },
  image:    { type: String, required: true },
  price:    { type: Number, required: true },
  size:     { type: String },
  color:    { type: String },
  qty:      { type: Number, required: true, default: 1 },
});

const orderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    orderItems: [orderItemSchema],
    shippingAddress: {
      firstName: String,
      lastName:  String,
      street:    String,
      city:      String,
      state:     String,
      pincode:   String,
      phone:     String,
    },
    paymentMethod:  { type: String, required: true },
    paymentResult:  {
      id:     String,
      status: String,
      updateTime: String,
    },
    itemsPrice:    { type: Number, required: true, default: 0 },
    shippingPrice: { type: Number, required: true, default: 0 },
    totalPrice:    { type: Number, required: true, default: 0 },
    isPaid:        { type: Boolean, default: false },
    paidAt:        Date,
    isDelivered:   { type: Boolean, default: false },
    deliveredAt:   Date,
    status: {
      type: String,
      enum: ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'],
      default: 'Pending',
    },
    orderNumber: { type: String, unique: true },
  },
  { timestamps: true }
);

// Auto-generate order number
orderSchema.pre('save', function (next) {
  if (!this.orderNumber) {
    this.orderNumber = 'TT-' + Date.now().toString().slice(-8);
  }
  next();
});

module.exports = mongoose.model('Order', orderSchema);
