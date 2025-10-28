// Cart module: provides cart operations with localStorage persistence and a simple subscriber API.

const STORAGE_KEY = 'iot_ecom_cart_v1';
let products = [];
let items = new Map(); // productId -> { product, qty }
const subscribers = new Set();

function persist() {
  try {
    const arr = Array.from(items.entries());
    localStorage.setItem(STORAGE_KEY, JSON.stringify(arr));
  } catch (e) { console.warn('Cart persist failed', e); }
}

function load() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return;
    const arr = JSON.parse(raw);
    items = new Map(arr.map(([id, val]) => [id, val]));
  } catch (e) { console.warn('Cart load failed', e); }
}

function notify() {
  subscribers.forEach(fn => {
    try { fn(); } catch (e) { console.warn('Cart subscriber error', e); }
  });
}

export const Cart = {
  init(prodList = []) {
    products = prodList || [];
    load();
    notify();
  },
  subscribe(fn) { subscribers.add(fn); return () => subscribers.delete(fn); },
  add(productId, qty = 1) {
    const p = products.find(x => x.id === productId);
    if (!p) return;
    const cur = items.get(productId) || { product: p, qty: 0 };
    cur.qty += qty;
    items.set(productId, cur);
    persist();
    notify();
  },
  changeQty(productId, delta) {
    const cur = items.get(productId);
    if (!cur) return;
    cur.qty += delta;
    if (cur.qty <= 0) items.delete(productId);
    else items.set(productId, cur);
    persist();
    notify();
  },
  remove(productId) {
    items.delete(productId);
    persist();
    notify();
  },
  clear() {
    items.clear();
    persist();
    notify();
  },
  getItems() {
    return Array.from(items.values());
  },
  getTotal() {
    return Array.from(items.values()).reduce((s, it) => s + (it.product.price || 0) * it.qty, 0);
  },
  getCount() {
    return Array.from(items.values()).reduce((s, it) => s + it.qty, 0);
  }
};
