const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const sign = u => jwt.sign({ id: u._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
const pack = u => ({ _id: u._id, name: u.name, email: u.email, role: u.role, token: sign(u) });

router.post('/register', async (req, res) => {
  try {
    const { name, email, password, rollNo, department } = req.body;
    if (await User.findOne({ email })) {
      return res.status(400).json({ message: 'Email already used' });
    }
    const user = await User.create({
      name, email, rollNo, department,
      password: await bcrypt.hash(password, 10)
    });
    res.status(201).json(pack(user));
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    res.json(pack(user));
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

module.exports = router;