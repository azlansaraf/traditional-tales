import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    try { return JSON.parse(localStorage.getItem('tt_cart') || '[]'); }
    catch { return []; }
  });
  const [cartOpen, setCartOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('tt_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product, qty = 1, size = '', color = '') => {
    setCartItems(prev => {
      const idx = prev.findIndex(i => i._id === product._id && i.size === size && i.color === color);
      if (idx >= 0) {
        const updated = [...prev];
        updated[idx] = { ...updated[idx], qty: updated[idx].qty + qty };
        return updated;
      }
      return [...prev, { _id: product._id, name: product.name, image: product.images?.[0] || '', price: product.price, size, color, qty }];
    });
    toast.success(`"${product.name}" added to bag`, { position: 'bottom-right', autoClose: 2000 });
  };

  const removeFromCart = (id, size, color) => {
    setCartItems(prev => prev.filter(i => !(i._id === id && i.size === size && i.color === color)));
  };

  const updateQty = (id, size, color, qty) => {
    if (qty <= 0) { removeFromCart(id, size, color); return; }
    setCartItems(prev => prev.map(i =>
      i._id === id && i.size === size && i.color === color ? { ...i, qty } : i
    ));
  };

  const clearCart = () => setCartItems([]);

  const totalItems    = cartItems.reduce((s, i) => s + i.qty, 0);
  const totalPrice    = cartItems.reduce((s, i) => s + i.price * i.qty, 0);
  const shippingPrice = totalPrice >= 2000 ? 0 : 99;

  return (
    <CartContext.Provider value={{ cartItems, cartOpen, setCartOpen, addToCart, removeFromCart, updateQty, clearCart, totalItems, totalPrice, shippingPrice }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
