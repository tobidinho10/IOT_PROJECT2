const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();

const SECRET = 'secret-key'; // Change this in production

// Register
router.post('/register', async (req, res) => {
  const { db } = req;
  const { username, password } = req.body;

  if (!username || !password)
    return res.status(400).json({ message: 'All fields required' });

  const existing = db.data.users.find(u => u.username === username);
  if (existing)
    return res.status(400).json({ message: 'User already exists' });

  const hashed = await bcrypt.hash(password, 10);
  db.data.users.push({ id: Date.now(), username, password: hashed });
  await db.write();

  res.json({ message: 'User registered successfully' });
});

// Login
router.post('/login', async (req, res) => {
  const { db } = req;
  const { username, password } = req.body;
  const user = db.data.users.find(u => u.username === username);

  if (!user) return res.status(400).json({ message: 'Invalid credentials' });

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(400).json({ message: 'Invalid credentials' });

  const token = jwt.sign({ id: user.id, username: user.username }, SECRET, { expiresIn: '1h' });
  res.json({ token });
});

module.exports = router;
