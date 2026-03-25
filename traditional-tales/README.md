# Traditional Tales — MERN Stack E-Commerce

A full-stack e-commerce website for **Traditional Tales**, a women's Abaya & Modest Fashion brand.  
Built with the **MERN stack** — MongoDB, Express, React, Node.js.

---

## 🗂 Project Structure

```
traditional-tales/
├── server/
│   ├── config/db.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── cartController.js
│   │   ├── orderController.js
│   │   ├── productController.js
│   │   └── userController.js
│   ├── middleware/auth.js
│   ├── models/
│   │   ├── Cart.js
│   │   ├── Order.js
│   │   ├── Product.js
│   │   └── User.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── cart.js
│   │   ├── orders.js
│   │   ├── products.js
│   │   └── users.js
│   ├── seed.js
│   └── index.js
├── client/
│   ├── public/index.html
│   └── src/
│       ├── App.js
│       ├── index.js
│       ├── index.css
│       ├── utils/api.js
│       ├── context/
│       │   ├── AuthContext.js
│       │   ├── CartContext.js
│       │   └── WishlistContext.js
│       ├── components/
│       │   ├── layout/   (Navbar, Footer)
│       │   ├── product/  (ProductCard)
│       │   ├── cart/     (CartSidebar)
│       │   └── common/   (ProtectedRoute)
│       └── pages/
│           ├── HomePage.js
│           ├── ProductsPage.js
│           ├── ProductDetailPage.js
│           ├── CheckoutPage.js
│           ├── OrderConfirmPage.js
│           ├── LoginPage.js
│           ├── RegisterPage.js
│           ├── WishlistPage.js
│           ├── ProfilePage.js
│           ├── OrdersPage.js
│           ├── AboutPage.js
│           ├── ContactPage.js
│           ├── SizeGuidePage.js
│           ├── FAQPage.js
│           ├── ShippingPage.js
│           └── NotFoundPage.js
├── .env
├── .gitignore
├── package.json
└── README.md
```

---

## ⚙️ Quick Start

### 1. Prerequisites
- Node.js v18+
- MongoDB (local) or MongoDB Atlas account

### 2. Install Dependencies

```bash
# In the root folder
npm install

# Install React client dependencies
npm install --prefix client
```

### 3. Configure Environment

Edit the `.env` file in the root:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/traditional_tales
JWT_SECRET=traditional_tales_jwt_secret_key_2026
NODE_ENV=development
CLIENT_URL=http://localhost:3000
```

> For **MongoDB Atlas**: replace `MONGO_URI` with your Atlas connection string.

### 4. Seed the Database

```bash
node server/seed.js
```

This creates **12 products** and an **admin account**:
- Email: `admin@traditionaltales.in`
- Password: `admin123`

### 5. Run the App

```bash
# Run frontend + backend together
npm run dev
```

- Frontend → http://localhost:3000  
- Backend API → http://localhost:5000/api

---

## 🌐 API Reference

### Auth `/api/auth`
| Method | Route | Description |
|--------|-------|-------------|
| POST | `/register` | Register new user |
| POST | `/login` | Login |
| GET | `/me` | Get current user (protected) |

### Products `/api/products`
| Method | Route | Description |
|--------|-------|-------------|
| GET | `/` | List all — supports `?category=`, `?search=`, `?badge=`, `?page=`, `?limit=` |
| GET | `/featured` | Get featured products |
| GET | `/:id` | Single product |
| POST | `/` | Create product (admin) |
| PUT | `/:id` | Update product (admin) |
| DELETE | `/:id` | Delete product (admin) |
| POST | `/:id/reviews` | Add review (protected) |

### Orders `/api/orders`
| Method | Route | Description |
|--------|-------|-------------|
| POST | `/` | Place order (protected) |
| GET | `/myorders` | My order history (protected) |
| GET | `/` | All orders (admin) |
| GET | `/:id` | Order detail (protected) |
| PUT | `/:id/pay` | Mark as paid (protected) |
| PUT | `/:id/status` | Update status (admin) |

### Cart `/api/cart`
| Method | Route | Description |
|--------|-------|-------------|
| GET | `/` | Get cart (protected) |
| POST | `/` | Add item (protected) |
| PUT | `/:itemId` | Update qty (protected) |
| DELETE | `/:itemId` | Remove item (protected) |
| DELETE | `/` | Clear cart (protected) |

### Users `/api/users`
| Method | Route | Description |
|--------|-------|-------------|
| PUT | `/profile` | Update profile (protected) |
| POST | `/wishlist/:productId` | Toggle wishlist (protected) |
| GET | `/` | All users (admin) |

---

## 📄 Pages

| Route | Page | Auth Required |
|-------|------|:---:|
| `/` | Home | ✗ |
| `/products` | All Products (search + filter) | ✗ |
| `/products/:id` | Product Detail | ✗ |
| `/wishlist` | Wishlist | ✗ |
| `/about` | Our Story | ✗ |
| `/contact` | Contact | ✗ |
| `/size-guide` | Size Guide | ✗ |
| `/faq` | FAQ | ✗ |
| `/shipping` | Shipping & Returns | ✗ |
| `/login` | Login | ✗ |
| `/register` | Register | ✗ |
| `/checkout` | Checkout | ✅ |
| `/order/:id` | Order Confirmation | ✅ |
| `/orders` | My Orders | ✅ |
| `/profile` | My Profile | ✅ |

---

## ✅ Features

- JWT authentication (register / login / protected routes)
- Product catalog with live search, category filter, pagination
- Shopping cart (localStorage — persists across reloads)
- Wishlist (localStorage)
- Full checkout flow → order saved to MongoDB
- Order confirmation with order number
- Order history page
- User profile update
- Responsive design + mobile nav menu
- Toast notifications
- Custom cursor
- Admin-ready API (product/order management endpoints)

---

## 🚀 Production Build

```bash
# Build React app
cd client && npm run build && cd ..

# Run in production
NODE_ENV=production node server/index.js
```

The Express server will serve the React build automatically.
