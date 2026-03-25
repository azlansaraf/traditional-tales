import React, { createContext, useContext, useState } from 'react';
import { toast } from 'react-toastify';

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState(() => {
    try { return JSON.parse(localStorage.getItem('tt_wishlist') || '[]'); }
    catch { return []; }
  });

  const toggleWishlist = (product) => {
    setWishlist(prev => {
      const exists = prev.find(p => p._id === product._id);
      let updated;
      if (exists) {
        updated = prev.filter(p => p._id !== product._id);
        toast.info(`Removed from wishlist`, { position: 'bottom-right', autoClose: 1500 });
      } else {
        updated = [...prev, product];
        toast.success(`Added to wishlist ♡`, { position: 'bottom-right', autoClose: 1500 });
      }
      localStorage.setItem('tt_wishlist', JSON.stringify(updated));
      return updated;
    });
  };

  const isWishlisted = (id) => wishlist.some(p => p._id === id);

  return (
    <WishlistContext.Provider value={{ wishlist, toggleWishlist, isWishlisted }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);
