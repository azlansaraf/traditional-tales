import React from 'react';
import { Link } from 'react-router-dom';
import { useWishlist } from '../context/WishlistContext';
import ProductCard from '../components/product/ProductCard';
import Footer from '../components/layout/Footer';

const WishlistPage = () => {
  const { wishlist } = useWishlist();
  return (
    <div style={{paddingTop:'100px',background:'var(--ivory)',minHeight:'100vh'}}>
      <div className="container" style={{paddingTop:'40px',paddingBottom:'80px'}}>
        <span className="section-label">Traditional Tales</span>
        <h1 className="page-heading">My <em>Wishlist</em></h1>
        <p className="page-subheading">{wishlist.length} saved piece{wishlist.length !== 1 ? 's' : ''}</p>
        {wishlist.length === 0 ? (
          <div style={{textAlign:'center',padding:'80px 20px',color:'var(--muted)'}}>
            <div style={{fontSize:'52px',opacity:.25,marginBottom:'18px'}}>♡</div>
            <p style={{fontSize:'14px',letterSpacing:'.12em',marginBottom:'24px'}}>No saved items yet.<br/>Browse and add pieces you love.</p>
            <Link to="/products" className="btn-primary">Browse Products</Link>
          </div>
        ) : (
          <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:'3px'}}>
            {wishlist.map(p => <ProductCard key={p._id} product={p} />)}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default WishlistPage;
