import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import api from '../utils/api';
import ProductCard from '../components/product/ProductCard';
import Footer from '../components/layout/Footer';
import './ProductsPage.css';

const CATEGORIES = ['All','Classic Abayas','Embroidered','Burkhas','Occasion Wear','Accessories'];

const ProductsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [total, setTotal]       = useState(0);
  const [page, setPage]         = useState(1);

  const category = searchParams.get('category') || 'All';
  const search   = searchParams.get('search')   || '';
  const badge    = searchParams.get('badge')    || '';

  useEffect(() => {
    setLoading(true);
    const params = { page, limit: 12 };
    if (category !== 'All') params.category = category;
    if (search) params.search = search;
    if (badge)  params.badge  = badge;

    api.get('/products', { params })
      .then(r => { setProducts(r.data.products); setTotal(r.data.total); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [category, search, badge, page]);

  const setFilter = (cat) => {
    const p = new URLSearchParams();
    if (cat !== 'All') p.set('category', cat);
    setSearchParams(p);
    setPage(1);
  };

  const handleSearch = (e) => {
    const p = new URLSearchParams(searchParams);
    if (e.target.value) p.set('search', e.target.value);
    else p.delete('search');
    setSearchParams(p);
    setPage(1);
  };

  return (
    <div className="products-page">
      <div className="products-page-header">
        <div className="container">
          <span className="section-label">Traditional Tales</span>
          <h1 className="page-heading">
            {category !== 'All' ? <><em>{category}</em></> : <>All <em>Products</em></>}
          </h1>
          <p className="page-subheading">{total} piece{total !== 1 ? 's' : ''} available</p>
        </div>
      </div>

      <div className="container products-layout">
        {/* Search */}
        <div className="search-bar-wrap">
          <span className="search-icon">🔍</span>
          <input
            className="search-bar"
            type="text"
            placeholder="Search abayas, burkhas, accessories..."
            defaultValue={search}
            onChange={handleSearch}
          />
        </div>

        {/* Filters */}
        <div className="filter-bar">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              className={`filter-btn${(category === cat || (cat === 'All' && !category)) ? ' active' : ''}`}
              onClick={() => setFilter(cat)}
            >{cat}</button>
          ))}
          <button
            className={`filter-btn${badge === 'Sale' ? ' active' : ''}`}
            onClick={() => { const p = new URLSearchParams(); p.set('badge','Sale'); setSearchParams(p); setPage(1); }}
          >Sale</button>
        </div>

        {/* Grid */}
        {loading ? (
          <div className="spinner" />
        ) : products.length === 0 ? (
          <div className="no-results">No products found. Try a different search or filter.</div>
        ) : (
          <div className="products-grid-page">
            {products.map(p => <ProductCard key={p._id} product={p} />)}
          </div>
        )}

        {/* Pagination */}
        {total > 12 && (
          <div className="pagination">
            {Array.from({ length: Math.ceil(total / 12) }, (_, i) => (
              <button
                key={i}
                className={`page-btn${page === i + 1 ? ' active' : ''}`}
                onClick={() => setPage(i + 1)}
              >{i + 1}</button>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default ProductsPage;
