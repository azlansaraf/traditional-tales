import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';
import Footer from '../components/layout/Footer';
import './CheckoutPage.css';

const CheckoutPage = () => {
  const { cartItems, totalPrice, shippingPrice, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    firstName: user?.firstName || '', lastName: user?.lastName || '',
    email: user?.email || '', phone: '',
    street: '', city: '', state: 'Karnataka', pincode: '',
    paymentMethod: 'UPI', upiId: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState('');

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const placeOrder = async (e) => {
    e.preventDefault();
    if (!cartItems.length) { setError('Your bag is empty'); return; }
    setLoading(true); setError('');
    try {
      const orderItems = cartItems.map(i => ({
        product: i._id, name: i.name, image: i.image, price: i.price, size: i.size, color: i.color, qty: i.qty,
      }));
      const { data } = await api.post('/orders', {
        orderItems,
        shippingAddress: { firstName: form.firstName, lastName: form.lastName, street: form.street, city: form.city, state: form.state, pincode: form.pincode, phone: form.phone },
        paymentMethod: form.paymentMethod,
        itemsPrice: totalPrice,
        shippingPrice,
        totalPrice: totalPrice + shippingPrice,
      });
      clearCart();
      navigate(`/order/${data._id}`);
    } catch (err) {
      setError(err.response?.data?.message || 'Order failed. Please try again.');
    } finally { setLoading(false); }
  };

  return (
    <div className="checkout-page">
      <div className="container">
        <span className="section-label">Secure Checkout</span>
        <h1 className="page-heading" style={{marginBottom:'36px'}}>Checkout</h1>

        <div className="checkout-grid">
          <form onSubmit={placeOrder}>
            {/* Contact */}
            <div className="checkout-section">
              <h3 className="checkout-section-title">Contact Information</h3>
              <div className="checkout-row-2">
                <div className="checkout-field"><label>First Name</label><input name="firstName" value={form.firstName} onChange={handleChange} required /></div>
                <div className="checkout-field"><label>Last Name</label><input name="lastName" value={form.lastName} onChange={handleChange} required /></div>
              </div>
              <div className="checkout-field"><label>Email</label><input type="email" name="email" value={form.email} onChange={handleChange} required /></div>
              <div className="checkout-field"><label>Phone</label><input type="tel" name="phone" value={form.phone} onChange={handleChange} required /></div>
            </div>

            {/* Shipping */}
            <div className="checkout-section">
              <h3 className="checkout-section-title">Shipping Address</h3>
              <div className="checkout-field"><label>Street Address</label><input name="street" value={form.street} onChange={handleChange} required /></div>
              <div className="checkout-row-2">
                <div className="checkout-field"><label>City</label><input name="city" value={form.city} onChange={handleChange} required /></div>
                <div className="checkout-field"><label>PIN Code</label><input name="pincode" value={form.pincode} onChange={handleChange} required /></div>
              </div>
              <div className="checkout-field">
                <label>State</label>
                <select name="state" value={form.state} onChange={handleChange}>
                  {['Karnataka','Maharashtra','Tamil Nadu','Delhi','Telangana','Kerala','Uttar Pradesh','West Bengal','Gujarat','Rajasthan'].map(s => <option key={s}>{s}</option>)}
                </select>
              </div>
            </div>

            {/* Payment */}
            <div className="checkout-section">
              <h3 className="checkout-section-title">Payment Method</h3>
              <div className="pay-methods">
                {['UPI','Credit Card','Debit Card','Net Banking','Cash on Delivery'].map(m => (
                  <button key={m} type="button" className={`pay-btn${form.paymentMethod === m ? ' active' : ''}`} onClick={() => setForm(f => ({...f, paymentMethod: m}))}>{m}</button>
                ))}
              </div>
              {form.paymentMethod === 'UPI' && (
                <div className="checkout-field"><label>UPI ID</label><input name="upiId" value={form.upiId} onChange={handleChange} placeholder="yourname@upi" /></div>
              )}
            </div>

            {error && <p className="form-error">{error}</p>}
            <button type="submit" className="btn-place-order" disabled={loading}>
              {loading ? 'Placing Order...' : 'Place Order'}
            </button>
          </form>

          {/* Order Summary */}
          <div className="order-summary">
            <h3 className="order-summary-title">Order Summary</h3>
            {cartItems.map((item, i) => (
              <div className="order-item" key={i}>
                <img src={item.image || 'https://via.placeholder.com/60'} alt={item.name} className="order-item-img" />
                <div className="order-item-info">
                  <p className="order-item-name">{item.name}</p>
                  <p className="order-item-sub">{item.size && `${item.size} · `}{item.color && `${item.color} · `}Qty: {item.qty}</p>
                </div>
                <p className="order-item-price">₹{(item.price * item.qty).toLocaleString()}</p>
              </div>
            ))}
            <hr className="order-divider" />
            <div className="order-row"><span>Subtotal</span><span>₹{totalPrice.toLocaleString()}</span></div>
            <div className="order-row"><span>Shipping</span><span>{shippingPrice === 0 ? 'Free' : `₹${shippingPrice}`}</span></div>
            <div className="order-total"><span>Total</span><span>₹{(totalPrice + shippingPrice).toLocaleString()}</span></div>
            <p className="secure-note">🔒 Secure checkout · Free returns · 100% authentic</p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CheckoutPage;
