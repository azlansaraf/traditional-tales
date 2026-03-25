import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../utils/api';
import { useCart }     from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import Footer from '../components/layout/Footer';
import './ProductDetailPage.css';

const ProductDetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mainImg, setMainImg] = useState('');
  const [selectedSize, setSelectedSize]   = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [qty, setQty] = useState(1);

  const { addToCart }       = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();

  useEffect(() => {
    api.get(`/products/${id}`)
      .then(r => { setProduct(r.data); setMainImg(r.data.images?.[0] || ''); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="spinner" style={{marginTop:'200px'}} />;
  if (!product) return <div style={{padding:'200px 50px',textAlign:'center'}}>Product not found.</div>;

  const wished = isWishlisted(product._id);

  return (
    <div className="detail-page">
      <div className="container">
        {/* Breadcrumb */}
        <div className="breadcrumb">
          <Link to="/">Home</Link><span>/</span>
          <Link to="/products">Products</Link><span>/</span>
          <span>{product.name}</span>
        </div>

        <div className="detail-grid">
          {/* Images */}
          <div className="detail-images">
            <div className="detail-thumbnails">
              {product.images?.map((img, i) => (
                <div key={i} className={`detail-thumb${mainImg === img ? ' active' : ''}`} onClick={() => setMainImg(img)}>
                  <img src={img} alt={`${product.name} ${i+1}`} />
                </div>
              ))}
            </div>
            <div className="detail-main-img">
              <img src={mainImg} alt={product.name} />
            </div>
          </div>

          {/* Info */}
          <div className="detail-info">
            <p className="detail-label">{product.category}</p>
            <h1 className="detail-name">{product.name}</h1>
            <div className="detail-price">
              {product.oldPrice && <span className="old-price">₹{product.oldPrice.toLocaleString()}</span>}
              ₹{product.price.toLocaleString()}
            </div>
            <div className="detail-rating">
              <span className="stars">★★★★★</span>
              <span className="rating-count">({product.numReviews} reviews)</span>
            </div>
            <p className="detail-desc">{product.description}</p>

            {/* Colour */}
            {product.colors?.length > 0 && (
              <>
                <span className="option-label">Colour: <strong>{selectedColor || 'Select'}</strong></span>
                <div className="color-options">
                  {product.colors.map(c => (
                    <button
                      key={c}
                      className={`color-pill${selectedColor === c ? ' active' : ''}`}
                      onClick={() => setSelectedColor(c)}
                    >{c}</button>
                  ))}
                </div>
              </>
            )}

            {/* Size */}
            {product.sizes?.length > 0 && (
              <>
                <span className="option-label">Size: <strong>{selectedSize || 'Select'}</strong></span>
                <div className="size-options">
                  {product.sizes.map(s => (
                    <button
                      key={s}
                      className={`size-btn${selectedSize === s ? ' active' : ''}`}
                      onClick={() => setSelectedSize(s)}
                    >{s}</button>
                  ))}
                </div>
              </>
            )}

            {/* Qty */}
            <div className="qty-row">
              <div className="qty-ctrl">
                <button className="qty-btn" onClick={() => setQty(q => Math.max(1, q - 1))}>−</button>
                <span className="qty-val">{qty}</span>
                <button className="qty-btn" onClick={() => setQty(q => q + 1)}>+</button>
              </div>
              <span className="stock-note">{product.countInStock > 0 ? `${product.countInStock} in stock` : 'Out of stock'}</span>
            </div>

            {/* CTAs */}
            <div className="detail-cta">
              <button
                className="btn-add-detail"
                disabled={product.countInStock === 0}
                onClick={() => addToCart(product, qty, selectedSize, selectedColor)}
              >
                {product.countInStock === 0 ? 'Out of Stock' : 'Add to Bag'}
              </button>
              <button className={`btn-wish-detail${wished ? ' active' : ''}`} onClick={() => toggleWishlist(product)}>
                {wished ? '♥' : '♡'}
              </button>
            </div>

            {/* Meta */}
            <div className="detail-meta">
              <p>SKU: {product.sku}</p>
              <p>Material: {product.material || 'Premium Fabric'}</p>
              <p>Care: {product.care || 'Dry clean only'}</p>
              <p>Category: {product.category}</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProductDetailPage;
