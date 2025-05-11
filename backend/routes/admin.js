const express = require('express');
const User = require('../models/User');
const { requireAdmin } = require('../middleware/auth');
const router = express.Router();

router.get('/users', requireAdmin, async (req, res) => {
  const users = await User.find({ role: 'user' }, 'name email balance');
  res.json(users);
});

router.post('/users/:id/balance', requireAdmin, async (req, res) => {
  const { amount } = req.body;
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    user.balance += Number(amount);
    await user.save();
    res.json({ message: 'Balance updated', balance: user.balance });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update balance' });
  }
});

module.exports = router;