import React, { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth }     from '../../context/AuthContext';
import { useCart }     from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import './Navbar.css';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, logout }        = useAuth();
  const { totalItems, setCartOpen } = useCart();
  const { wishlist }            = useWishlist();
  const navigate                = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleLogout = () => { logout(); navigate('/'); };

  return (
    <nav className={`navbar${scrolled ? ' scrolled' : ''}`}>
      {/* Left nav */}
      <ul className="nav-left">
        <li><NavLink to="/">Home</NavLink></li>
        <li><NavLink to="/products?category=Classic Abayas">Abayas</NavLink></li>
        <li><NavLink to="/products?category=Burkhas">Burkhas</NavLink></li>
        <li><NavLink to="/products?category=Accessories">Accessories</NavLink></li>
        <li><NavLink to="/about">Our Story</NavLink></li>
        <li><NavLink to="/contact">Contact</NavLink></li>
      </ul>

      {/* Centre logo */}
      <Link to="/" className="nav-logo">
        Traditional<span className="logo-dot"> ✦ </span>Tales
      </Link>

      {/* Right actions */}
      <div className="nav-right">
        {user ? (
          <div className="nav-account">
            <button className="nav-icon-btn">
              {user.firstName}
            </button>
            <div className="account-dropdown">
              <Link to="/profile">My Profile</Link>
              <Link to="/orders">My Orders</Link>
              <button onClick={handleLogout}>Sign Out</button>
            </div>
          </div>
        ) : (
          <Link to="/login" className="nav-icon-btn">Account</Link>
        )}
        <Link to="/wishlist" className="nav-icon-btn wishlist-btn">
          ♡<span className="nav-badge">{wishlist.length}</span>
        </Link>
        <button className="cart-nav-btn" onClick={() => setCartOpen(true)}>
          Bag&nbsp;<span>{totalItems}</span>
        </button>
        {/* Mobile hamburger */}
        <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          <span /><span /><span />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="mobile-menu">
          <NavLink to="/" onClick={() => setMenuOpen(false)}>Home</NavLink>
          <NavLink to="/products" onClick={() => setMenuOpen(false)}>All Products</NavLink>
          <NavLink to="/products?category=Classic Abayas" onClick={() => setMenuOpen(false)}>Abayas</NavLink>
          <NavLink to="/products?category=Burkhas" onClick={() => setMenuOpen(false)}>Burkhas</NavLink>
          <NavLink to="/products?category=Accessories" onClick={() => setMenuOpen(false)}>Accessories</NavLink>
          <NavLink to="/about"   onClick={() => setMenuOpen(false)}>Our Story</NavLink>
          <NavLink to="/contact" onClick={() => setMenuOpen(false)}>Contact</NavLink>
          {user ? (
            <><NavLink to="/profile" onClick={() => setMenuOpen(false)}>Profile</NavLink>
            <button onClick={() => { handleLogout(); setMenuOpen(false); }}>Sign Out</button></>
          ) : (
            <NavLink to="/login" onClick={() => setMenuOpen(false)}>Login</NavLink>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
