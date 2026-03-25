import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import './CartSidebar.css';

const CartSidebar = () => {
  const { cartItems, cartOpen, setCartOpen, removeFromCart, updateQty, totalPrice, shippingPrice } = useCart();

  return (
    <>
      <div className={`cart-overlay${cartOpen ? ' open' : ''}`} onClick={() => setCartOpen(false)} />
      <div className={`cart-sidebar${cartOpen ? ' open' : ''}`}>
        <div className="cart-header">
          <h2 className="cart-title">Your Bag</h2>
          <button className="cart-close" onClick={() => setCartOpen(false)}>✕</button>
        </div>

        <div className="cart-items">
          {cartItems.length === 0 ? (
            <div className="cart-empty">
              <div className="cart-empty-icon">🛍</div>
              <p>Your bag is empty</p>
              <button className="btn-outline" onClick={() => setCartOpen(false)} style={{marginTop:'16px'}}>
                Continue Shopping
              </button>
            </div>
          ) : (
            cartItems.map((item, i) => (
              <div className="cart-item" key={`${item._id}-${item.size}-${item.color}-${i}`}>
                <img className="cart-item-img" src={item.image || 'https://via.placeholder.com/80x100'} alt={item.name} />
                <div className="cart-item-info">
                  <div className="cart-item-name">{item.name}</div>
                  <div className="cart-item-sub">
                    {item.size && <span>{item.size}</span>}
                    {item.color && <span> · {item.color}</span>}
                  </div>
                  <div className="cart-item-qty">
                    <button className="ciq-btn" onClick={() => updateQty(item._id, item.size, item.color, item.qty - 1)}>−</button>
                    <span className="ciq-val">{item.qty}</span>
                    <button className="ciq-btn" onClick={() => updateQty(item._id, item.size, item.color, item.qty + 1)}>+</button>
                  </div>
                </div>
                <div className="cart-item-right">
                  <button className="cart-item-remove" onClick={() => removeFromCart(item._id, item.size, item.color)}>✕</button>
                  <div className="cart-item-price">₹{(item.price * item.qty).toLocaleString()}</div>
                </div>
              </div>
            ))
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="cart-footer">
            <div className="cart-row"><span>Subtotal</span><span>₹{totalPrice.toLocaleString()}</span></div>
            <div className="cart-row"><span>Shipping</span><span>{shippingPrice === 0 ? 'Free' : `₹${shippingPrice}`}</span></div>
            <div className="cart-total"><span>Total</span><span>₹{(totalPrice + shippingPrice).toLocaleString()}</span></div>
            <Link to="/checkout" className="btn-checkout" onClick={() => setCartOpen(false)}>Proceed to Checkout</Link>
            <button className="btn-continue" onClick={() => setCartOpen(false)}>Continue Shopping</button>
          </div>
        )}
      </div>
    </>
  );
};

export default CartSidebar;
