# Minimal E‑Commerce Starter

## Running Locally

### Backend
1. Install dependencies:
   ```powershell
   cd ecommerce-backend
   npm install
   ```
2. Start the server:
   ```powershell
   npm start
   ```
   - Server runs on [http://localhost:5000](http://localhost:5000)
   - Data is stored in `ecommerce-backend/db.json`
   - Serves static frontend from `frontend/` (visit http://localhost:5000)

### Frontend
- No build step required. All files are served by the backend.
- Visit [http://localhost:5000](http://localhost:5000) in your browser.

## API Endpoints

### Auth
- `POST /api/auth/register` — `{ username, password }`
- `POST /api/auth/login` — `{ username, password }` → `{ token }`

### Products
- `GET /api/products` — Returns array of products

### Orders
- `POST /api/orders` — `{ items: [{ productId, qty }], total }` (Requires JWT)
- `GET /api/orders` — Returns user's orders (Requires JWT)

## Features
- Register/login to place orders
- Add/remove products to cart
- Checkout with authentication
- Cart and order UI with modern styling
- Toggle between login and register forms

## Checkout Flow
- Validates cart and authentication
- Prepares order data (product IDs, quantities, total)
- Sends order to backend with JWT
- Handles success and error feedback

---
For more details, see code comments and `docs/api.md` (if present).




