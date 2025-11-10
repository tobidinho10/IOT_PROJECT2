const express = require('express');
const auth = require('../middleware/authMiddleware');
const router = express.Router();

// Protected route — only logged-in users can create orders
router.post('/', auth, async (req, res) => {
  const { db } = req;
  const { items, total } = req.body;

  if (!items || !Array.isArray(items) || items.length === 0)
    return res.status(400).json({ message: 'Invalid or empty order' });

  const order = {
    id: Date.now(),
    userId: req.user.id,
    items,
    total,
    date: new Date().toISOString()
  };

  db.data.orders.push(order);
  await db.write();

  res.json({ message: 'Order placed successfully', id: order.id, order });
});

// Get orders for current user
router.get('/', auth, (req, res) => {
  const { db } = req;
  const userOrders = db.data.orders.filter(o => o.userId === req.user.id);
  res.json(userOrders);
});

module.exports = router;
