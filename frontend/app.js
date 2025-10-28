// Main frontend app for the e-commerce starter.
// - Delegates cart behavior to `cart.js` which implements localStorage persistence and an observable API.
// - Tries to GET /products and POST /orders. If backend calls fail, falls back to local mock data so the UI still works.

import { Cart } from './cart.js';

const PRODUCTS_ENDPOINT = '/products';
const ORDERS_ENDPOINT = '/orders';

const seedProducts = [
  { 
    id: 'p1', 
    name: 'Classic White Tee', 
    price: 19.99, 
    description: 'Premium cotton crew neck t-shirt in classic white', 
    image: 'https://placehold.co/420x280/e2e8f0/1e293b?text=Classic+Tee'
  },
  { 
    id: 'p2', 
    name: 'Navy Zip Hoodie', 
    price: 39.99, 
    description: 'Cozy cotton-blend zip-up hoodie in deep navy', 
    image: 'https://placehold.co/420x280/e2e8f0/1e293b?text=Hoodie' 
  },
  { 
    id: 'p3', 
    name: 'Developer Sticker Pack', 
    price: 4.99, 
    description: 'Set of 5 vinyl stickers featuring coding themes', 
    image: 'https://placehold.co/420x280/e2e8f0/1e293b?text=Stickers'
  },
  {
    id: 'p4',
    name: 'Coffee Mug',
    price: 12.99,
    description: 'Large ceramic mug with minimalist design',
    image: 'https://placehold.co/420x280/e2e8f0/1e293b?text=Coffee+Mug'
  },
  {
    id: 'p5',
    name: 'Laptop Sleeve',
    price: 24.99,
    description: 'Padded 13" laptop sleeve in heather gray',
    image: 'https://placehold.co/420x280/e2e8f0/1e293b?text=Laptop+Sleeve'
  },
  {
    id: 'p6',
    name: 'Cap',
    price: 15.99,
    description: 'Embroidered cotton cap in black',
    image: 'https://placehold.co/420x280/e2e8f0/1e293b?text=Cap'
  }
];

let products = [];

function $(sel) { return document.querySelector(sel); }

function showToast(msg, timeout = 3000) {
  const t = $('#toast');
  t.textContent = msg;
  t.classList.add('visible');
  setTimeout(() => t.classList.remove('visible'), timeout);
}

async function fetchProducts() {
  try {
    const res = await fetch(PRODUCTS_ENDPOINT);
    if (!res.ok) throw new Error('Bad response');
    const data = await res.json();
    products = Array.isArray(data) ? data : [];
    if (!products.length) products = seedProducts;
    showToast('Loaded products from backend');
  } catch (err) {
    console.warn('Could not fetch products, using seed data:', err);
    products = seedProducts;
    showToast('Using local product data (no backend)');
  }
}

function renderProducts() {
  const container = $('#products');
  container.innerHTML = '';
  products.forEach(p => {
    const card = document.createElement('article');
    card.className = 'product-card';
    card.innerHTML = `
      <div class="product-media">${p.image ? `<img src="${p.image}" alt="${p.name}">` : '<div class="placeholder">No image</div>'}</div>
      <div class="product-body">
        <h3>${p.name}</h3>
        <p class="desc">${p.description || ''}</p>
        <div class="product-meta">
          <div class="price">$${p.price.toFixed(2)}</div>
          <button data-id="${p.id}" class="add">Add to cart</button>
        </div>
      </div>
    `;
    container.appendChild(card);
  });
}

function renderCart() {
  const list = $('#cart-items');
  list.innerHTML = '';
  const items = Cart.getItems();
  items.forEach(entry => {
    const id = entry.product.id;
    const li = document.createElement('li');
    li.className = 'cart-item';
    li.innerHTML = `
      <div class="ci-left">
        <div class="ci-name">${entry.product.name}</div>
        <div class="ci-price">$${entry.product.price.toFixed(2)}</div>
      </div>
      <div class="ci-right">
        <button class="dec" data-id="${id}">−</button>
        <span class="qty">${entry.qty}</span>
        <button class="inc" data-id="${id}">+</button>
        <button class="rem" data-id="${id}">Remove</button>
      </div>
    `;
    list.appendChild(li);
  });
  $('#cart-total').textContent = Cart.getTotal().toFixed(2);
  $('#cart-count').textContent = String(Cart.getCount());
}

function openCart() {
  const drawer = $('#cart-drawer');
  drawer.setAttribute('aria-hidden', 'false');
  drawer.classList.add('open');
}
function closeCart() {
  const drawer = $('#cart-drawer');
  drawer.setAttribute('aria-hidden', 'true');
  drawer.classList.remove('open');
}

async function checkout() {
  if (Cart.getCount() === 0) { showToast('Cart is empty'); return; }
  const order = {
    items: Cart.getItems().map(it => ({ productId: it.product.id, qty: it.qty })),
    total: Cart.getTotal(),
    createdAt: new Date().toISOString(),
  };
  try {
    const res = await fetch(ORDERS_ENDPOINT, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(order) });
    if (!res.ok) throw new Error('Order failed');
    const data = await res.json();
    Cart.clear();
    renderCart();
    closeCart();
    showToast(data && data.id ? `Order ${data.id} created` : 'Order created');
  } catch (err) {
    console.warn('Order POST failed, showing mock success', err);
    // Mock success
    Cart.clear();
    renderCart();
    closeCart();
    showToast('Mock order created (no backend)');
  }
}

function attachEventHandlers() {
  document.addEventListener('click', (e) => {
    const add = e.target.closest('button.add');
    if (add) { Cart.add(add.dataset.id); return; }

    const viewCart = e.target.closest('#view-cart');
    if (viewCart) { openCart(); return; }

    const close = e.target.closest('#close-cart');
    if (close) { closeCart(); return; }

    const inc = e.target.closest('button.inc');
    if (inc) { Cart.changeQty(inc.dataset.id, +1); return; }

    const dec = e.target.closest('button.dec');
    if (dec) { Cart.changeQty(dec.dataset.id, -1); return; }

    const rem = e.target.closest('button.rem');
    if (rem) { Cart.remove(rem.dataset.id); return; }

    const checkoutBtn = e.target.closest('#checkout');
    if (checkoutBtn) { checkout(); return; }
  });
}

async function init() {
  await fetchProducts();
  renderProducts();
  Cart.init(products);
  Cart.subscribe(renderCart);
  renderCart();
  attachEventHandlers();
}

init();
