# Getting Started Guide

This is a minimal full-stack e-commerce starter with a vanilla JS frontend and Express/LowDB backend. Here's how to get up and running.

## Quick Start

### Running the Frontend

1. **Using Node.js (recommended)**
```bash
cd frontend
npx serve
```
Then open http://localhost:3000 in your browser.

2. **Using Python (alternative)**
```bash
cd frontend
python -m http.server 8000
```
Then open http://localhost:8000 in your browser.

### Development Notes

#### Frontend (`/frontend`)
- `index.html` - Main product listing and cart UI
- `app.js` - Core application logic, handles product fetching and UI updates
- `cart.js` - Cart management with localStorage persistence
- `styles.css` - Responsive styling

The frontend will:
1. Try to fetch products from `/products` endpoint
2. Fall back to seed data if backend is not available
3. Save cart state to localStorage
4. Mock successful checkout if `/orders` endpoint is not available

#### Running Tests

Open `frontend/cart.test.html` in a browser to run the cart module tests. No build step required.

```bash
cd frontend
npx serve
# Then open http://localhost:3000/cart.test.html
```

### Project Structure

```
├── frontend/
│   ├── index.html      # Main product listing page
│   ├── app.js          # Core application logic
│   ├── cart.js         # Cart management module
│   ├── styles.css      # Styling
│   ├── cart.test.html  # Browser-based tests
│   └── images/         # Product images
│       └── README.md   # Image credits and info
└── GETTING_STARTED.md  # This file
```

### Development Workflow

1. **Frontend Changes**
   - Edit files in `frontend/`
   - Serve the directory using steps above
   - Check cart.test.html for cart logic tests
   - Cart data persists in localStorage (clear browser data to reset)

2. **Adding Products**
   - Add images to `frontend/images/`
   - Update product seed data in `app.js`
   - Recommended image size: 420x280px

### Troubleshooting

1. **Images not loading**
   - Ensure images exist in `frontend/images/`
   - Check image paths in `app.js` product data
   - Verify image dimensions (recommended: 420x280px)

2. **Cart not persisting**
   - Check browser console for errors
   - Verify localStorage is available (not blocked by privacy settings)
   - Try clearing localStorage: `localStorage.removeItem('iot_ecom_cart_v1')`

3. **Tests not running**
   - Ensure you're serving the files (not opening directly with file://)
   - Check browser console for script errors
   - Verify all test dependencies load (Mocha, Chai)

### Coming Soon

- Backend setup with Express + LowDB
- Real API endpoints for products and orders
- Database seeding script
- API documentation

Need help? Check the GitHub issues or reach out to the maintainers.