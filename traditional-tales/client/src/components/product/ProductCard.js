import React from 'react';
import { Link } from 'react-router-dom';
import { useCart }     from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const { addToCart }       = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();
  const wished = isWishlisted(product._id);

  return (
    <div className="product-card">
      <div className="product-img-wrap">
        <img src={product.images?.[0] || 'https://via.placeholder.com/400x500'} alt={product.name} loading="lazy" />
        {product.badge && (
          <span className={`product-badge${product.badge === 'Sale' ? ' sale' : ''}`}>{product.badge}</span>
        )}
        <div className="product-actions">
          <button className="add-to-cart-btn" onClick={() => addToCart(product)}>Add to Bag</button>
          <button className={`wishlist-toggle${wished ? ' active' : ''}`} onClick={() => toggleWishlist(product)}>
            {wished ? '♥' : '♡'}
          </button>
        </div>
        <Link to={`/products/${product._id}`} className="quick-view-btn">View Details</Link>
      </div>
      <div className="product-info">
        <Link to={`/products/${product._id}`} className="product-name-link">
          <h3 className="product-name-card">{product.name}</h3>
        </Link>
        <p className="product-sub-card">{product.category}</p>
        <p className="product-price-card">
          {product.oldPrice && <span className="old">₹{product.oldPrice.toLocaleString()}</span>}
          ₹{product.price.toLocaleString()}
        </p>
      </div>
    </div>
  );
};

export default ProductCard;
