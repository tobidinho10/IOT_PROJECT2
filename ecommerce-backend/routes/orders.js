const express = require('express');
const auth = require('../middleware/authMiddleware');
const router = express.Router();

// Protected route — only logged-in users can create orders
router.post('/', auth, async (req, res) => {
  const { db } = req;
  const { items } = req.body;

  if (!items || !Array.isArray(items))
    return res.status(400).json({ message: 'Invalid order format' });

  const order = {
    id: Date.now(),
    userId: req.user.id,
    items,
    date: new Date().toISOString()
  };

  db.data.orders.push(order);
  await db.write();

  res.json({ message: 'Order placed successfully', order });
});

// Get orders for current user
router.get('/', auth, (req, res) => {
  const { db } = req;
  const userOrders = db.data.orders.filter(o => o.userId === req.user.id);
  res.json(userOrders);
});

module.exports = router;
