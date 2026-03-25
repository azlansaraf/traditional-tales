import React, { useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { AuthProvider }     from './context/AuthContext';
import { CartProvider }     from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';

import Navbar         from './components/layout/Navbar';
import CartSidebar    from './components/cart/CartSidebar';
import ProtectedRoute from './components/common/ProtectedRoute';

import HomePage         from './pages/HomePage';
import ProductsPage     from './pages/ProductsPage';
import ProductDetailPage from './pages/ProductDetailPage';
import WishlistPage     from './pages/WishlistPage';
import CheckoutPage     from './pages/CheckoutPage';
import OrderConfirmPage from './pages/OrderConfirmPage';
import LoginPage        from './pages/LoginPage';
import RegisterPage     from './pages/RegisterPage';
import ProfilePage      from './pages/ProfilePage';
import OrdersPage       from './pages/OrdersPage';
import AboutPage        from './pages/AboutPage';
import ContactPage      from './pages/ContactPage';
import SizeGuidePage    from './pages/SizeGuidePage';
import FAQPage          from './pages/FAQPage';
import ShippingPage     from './pages/ShippingPage';
import NotFoundPage     from './pages/NotFoundPage';

function App() {
  const cursorRef = useRef(null);
  const ringRef   = useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const ring   = ringRef.current;
    const move = (e) => {
      if (cursor) { cursor.style.left = e.clientX + 'px'; cursor.style.top = e.clientY + 'px'; }
      setTimeout(() => {
        if (ring) { ring.style.left = e.clientX + 'px'; ring.style.top = e.clientY + 'px'; }
      }, 60);
    };
    const over = (e) => {
      const isHoverable = e.target.closest('a, button, .product-card, .cat-card, input, select, textarea');
      cursor?.classList.toggle('hovered', !!isHoverable);
      ring?.classList.toggle('hovered', !!isHoverable);
    };
    document.addEventListener('mousemove', move);
    document.addEventListener('mouseover', over);
    return () => { document.removeEventListener('mousemove', move); document.removeEventListener('mouseover', over); };
  }, []);

  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <WishlistProvider>
            <div ref={cursorRef} className="cursor" />
            <div ref={ringRef}   className="cursor-ring" />
            <Navbar />
            <CartSidebar />
            <main>
              <Routes>
                <Route path="/"                  element={<HomePage />} />
                <Route path="/products"          element={<ProductsPage />} />
                <Route path="/products/:id"      element={<ProductDetailPage />} />
                <Route path="/wishlist"          element={<WishlistPage />} />
                <Route path="/about"             element={<AboutPage />} />
                <Route path="/contact"           element={<ContactPage />} />
                <Route path="/size-guide"        element={<SizeGuidePage />} />
                <Route path="/faq"               element={<FAQPage />} />
                <Route path="/shipping"          element={<ShippingPage />} />
                <Route path="/login"             element={<LoginPage />} />
                <Route path="/register"          element={<RegisterPage />} />
                <Route path="/checkout"          element={<ProtectedRoute><CheckoutPage /></ProtectedRoute>} />
                <Route path="/order/:id"         element={<ProtectedRoute><OrderConfirmPage /></ProtectedRoute>} />
                <Route path="/profile"           element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
                <Route path="/orders"            element={<ProtectedRoute><OrdersPage /></ProtectedRoute>} />
                <Route path="*"                  element={<NotFoundPage />} />
              </Routes>
            </main>
            <ToastContainer theme="light" />
          </WishlistProvider>
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
