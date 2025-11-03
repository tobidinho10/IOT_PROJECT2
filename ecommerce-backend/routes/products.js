const express = require('express');
const router = express.Router();

// GET all products
router.get('/', (req, res) => {
  const { db } = req;
  res.json(db.data.products);
});

module.exports = router;
