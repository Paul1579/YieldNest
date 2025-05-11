const express = require('express');
const router = express.Router();

router.get('/profile', (req, res) => {
  const { name, email, balance } = req.user;
  res.json({ name, email, balance });
});

module.exports = router;