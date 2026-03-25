import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => (
  <footer className="footer">
    <div className="footer-top container">
      <div className="footer-brand-col">
        <div className="footer-brand">Traditional <span>✦</span> Tales</div>
        <p className="footer-arabic">التراث — الضوء والأناقة</p>
        <p className="footer-tagline">Modest fashion crafted with love and intention. Wear your values beautifully.</p>
      </div>
      <div>
        <p className="footer-col-title">Shop</p>
        <ul className="footer-links">
          <li><Link to="/products">New Arrivals</Link></li>
          <li><Link to="/products?category=Classic Abayas">Classic Abayas</Link></li>
          <li><Link to="/products?category=Burkhas">Burkhas</Link></li>
          <li><Link to="/products?category=Embroidered">Embroidered</Link></li>
          <li><Link to="/products?badge=Sale">Sale</Link></li>
        </ul>
      </div>
      <div>
        <p className="footer-col-title">Help</p>
        <ul className="footer-links">
          <li><Link to="/shipping">Shipping & Returns</Link></li>
          <li><Link to="/size-guide">Size Guide</Link></li>
          <li><Link to="/faq">FAQ</Link></li>
          <li><Link to="/contact">Contact Us</Link></li>
        </ul>
      </div>
      <div>
        <p className="footer-col-title">Company</p>
        <ul className="footer-links">
          <li><Link to="/about">Our Story</Link></li>
          <li><Link to="/about">Sustainability</Link></li>
          <li><Link to="/contact">Press</Link></li>
          <li><Link to="/profile">My Account</Link></li>
        </ul>
      </div>
    </div>
    <div className="footer-bottom container">
      <p className="footer-copy">© 2026 Traditional Tales Modest Fashion. All rights reserved.</p>
      <div className="footer-socials">
        <a href="#" className="social-lnk">Instagram</a>
        <a href="#" className="social-lnk">Pinterest</a>
        <a href="#" className="social-lnk">WhatsApp</a>
      </div>
    </div>
  </footer>
);

export default Footer;
