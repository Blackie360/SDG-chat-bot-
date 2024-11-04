import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';

const router = express.Router();

// Register
router.post('/register', async (req, res) => {
  try {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ error: 'Email already exists' });
    }

    const user = new User({ email, password });
    await user.save();

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
    res.status(201).json({ user: { id: user._id, email: user.email }, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
    res.json({ user: { id: user._id, email: user.email }, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default router;