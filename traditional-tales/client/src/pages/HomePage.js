import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../utils/api';
import ProductCard from '../components/product/ProductCard';
import Footer from '../components/layout/Footer';
import './HomePage.css';

const CATEGORIES = [
  { label: 'Classic Abayas', count: '96 designs', img: 'https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=900&q=85' },
  { label: 'Embroidered',    count: '64 designs', img: 'https://images.unsplash.com/photo-1622396481328-9b1b78cdd9fd?w=600&q=85' },
  { label: 'Burkhas',        count: '52 designs', img: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=600&q=85' },
  { label: 'Occasion Wear',  count: '38 designs', img: 'https://images.unsplash.com/photo-1512361436605-a484bdb34b5f?w=600&q=85' },
  { label: 'Accessories',    count: 'Hijabs & more', img: 'https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?w=600&q=85' },
];

const HomePage = () => {
  const [featured, setFeatured] = useState([]);
  const [loading, setLoading]   = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    api.get('/products/featured')
      .then(r => setFeatured(r.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="home-page">

      {/* ── HERO ── */}
      <section className="hero">
        <div className="hero-left">
          <div className="corner-tl" />
          <div className="corner-br" />
          <div className="hero-tag">Spring · Summer 2026</div>
          <p className="hero-arabic">مجموعة الربيع والصيف</p>
          <h1 className="hero-title">
            Grace in<br />
            <em>every fold.</em>
            <strong>Modest Fashion Redefined</strong>
          </h1>
          <div className="hero-divider" />
          <p className="hero-desc">
            Handcrafted abayas and burkhas for the modern Muslim woman —
            where modesty meets timeless elegance.
          </p>
          <div className="hero-cta">
            <Link to="/products" className="btn-gold">Shop Collection</Link>
            <Link to="/about" className="btn-ghost">Our Story</Link>
          </div>
          <div className="hero-scroll">
            <div className="hero-scroll-line" />
            Scroll to explore
          </div>
        </div>
        <div className="hero-right">
          <div className="hero-right-top">
            <img src="https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=900&q=85" alt="Abaya Collection" />
          </div>
          <div className="hero-right-bottom">
            <div className="hero-sub-img">
              <img src="https://images.unsplash.com/photo-1580894732444-8ecded7900cd?w=600&q=85" alt="Abaya detail" />
            </div>
            <div className="hero-stat">
              <span className="hero-stat-num">280+</span>
              <span className="hero-stat-label">Designs</span>
              <span className="hero-stat-sub">Since 2018</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── MARQUEE ── */}
      <div className="marquee-wrap">
        <div className="marquee-track">
          {['New Spring Arrivals','Free Shipping Over ₹2,000','Handcrafted with Care','Premium Fabrics Only','Easy Returns & Exchanges'].concat(
           ['New Spring Arrivals','Free Shipping Over ₹2,000','Handcrafted with Care','Premium Fabrics Only','Easy Returns & Exchanges'])
           .map((t, i) => <span key={i} className="marquee-item">{t}</span>)}
        </div>
      </div>

      {/* ── CATEGORIES ── */}
      <section className="section-cats">
        <div className="container">
          <div className="section-header">
            <div>
              <span className="section-label">Explore Our Range</span>
              <h2 className="section-title">Every <em>style,</em><br />one sanctuary.</h2>
            </div>
            <Link to="/products" className="view-all-link">All Products →</Link>
          </div>
          <div className="categories-grid">
            {CATEGORIES.map((cat, i) => (
              <div
                key={cat.label}
                className={`cat-card${i === 0 ? ' cat-large' : ''}`}
                onClick={() => navigate(`/products?category=${encodeURIComponent(cat.label)}`)}
              >
                <img src={cat.img} alt={cat.label} loading="lazy" />
                <div className="cat-info">
                  <h3 className="cat-name">{cat.label}</h3>
                  <p className="cat-count">{cat.count}</p>
                  <span className="cat-arrow">Explore →</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURED PRODUCTS ── */}
      <section className="section-featured">
        <div className="container">
          <div className="section-header">
            <div>
              <span className="section-label">Curated for You</span>
              <h2 className="section-title">Featured <em>Pieces</em></h2>
            </div>
            <Link to="/products" className="view-all-link">View All →</Link>
          </div>
          {loading ? (
            <div className="spinner" />
          ) : (
            <div className="products-grid">
              {featured.map(p => <ProductCard key={p._id} product={p} />)}
            </div>
          )}
        </div>
      </section>

      {/* ── NEWSLETTER ── */}
      <section className="newsletter-section">
        <div className="newsletter-bg-text">نور</div>
        <div className="container newsletter-grid">
          <div>
            <span className="newsletter-label">Join Our Circle</span>
            <h2 className="newsletter-title">Modesty,<br /><em>elevated</em><br />for you.</h2>
            <p className="newsletter-body">Be the first to discover new collections, receive exclusive styling inspiration, and access member-only offers.</p>
            <div className="newsletter-perks">
              {['Early access to new collections','10% off your first order','Styling tips & lookbooks','Free returns, always'].map(p => (
                <div key={p} className="perk">❖ {p}</div>
              ))}
            </div>
          </div>
          <form className="newsletter-form" onSubmit={e => { e.preventDefault(); alert('Thanks for subscribing!'); }}>
            <div className="form-row-2">
              <div className="form-grp"><label>First Name</label><input type="text" placeholder="Fatima" /></div>
              <div className="form-grp"><label>Last Name</label><input type="text" placeholder="Shaikh" /></div>
            </div>
            <div className="form-grp"><label>Email Address</label><input type="email" placeholder="fatima@example.com" required /></div>
            <button type="submit" className="subscribe-btn">Join Traditional Tales</button>
            <p className="form-note">By subscribing you agree to our privacy policy. Unsubscribe anytime.</p>
          </form>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default HomePage;
