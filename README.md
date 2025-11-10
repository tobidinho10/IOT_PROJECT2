# Minimal E‑Commerce Starter

## Running Locally

### Backend
1. Install dependencies:
   ```sh
   cd ecommerce-backend
   npm install
   ```
2. Start the server:
   ```sh
   npm start
   ```
   - Server runs on [http://localhost:5000](http://localhost:5000)
   - Data is stored in `ecommerce-backend/db.json`

### Frontend
Open `frontend/index.html` in your browser. No build step required.

## API Endpoints

### Auth
- `POST /api/auth/register` — `{ username, password }`
- `POST /api/auth/login` — `{ username, password }` → `{ token }`

### Products
- `GET /api/products` — Returns array of products

### Orders
- `POST /api/orders` — `{ items: [{ productId, qty }], ... }` (Requires JWT)
- `GET /api/orders` — Returns user's orders (Requires JWT)

## Features
- Register/login to place orders
- Add/remove products to cart
- Checkout with authentication

---
For more details, see code comments and `docs/api.md` (if present).




