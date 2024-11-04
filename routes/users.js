import express from 'express';
import jwt from 'jsonwebtoken';
import { auth } from '../middleware/auth.js';
import User from '../models/user.js';

const router = express.Router();

// Register
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ error: 'Email already exists' });
    }

    const user = new User({ name, email, password });
    await user.save();

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
    res.status(201).json({ 
      user: { 
        id: user._id, 
        name: user.name, 
        email: user.email,
        role: user.role 
      }, 
      token 
    });
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
    res.json({ 
      user: { 
        id: user._id, 
        name: user.name, 
        email: user.email,
        role: user.role 
      }, 
      token 
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get user details
router.get('/:id', auth, async (req, res) => {
  try {
    if (req.user._id.toString() !== req.params.id) {
      return res.status(403).json({ error: 'Access denied' });
    }
    
    const user = await User.findById(req.params.id).select('-password');
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update user
router.put('/:id', auth, async (req, res) => {
  try {
    if (req.user._id.toString() !== req.params.id) {
      return res.status(403).json({ error: 'Access denied' });
    }

    const updates = {};
    if (req.body.name) updates.name = req.body.name;
    if (req.body.email) updates.email = req.body.email;

    const user = await User.findByIdAndUpdate(
      req.params.id,
      updates,
      { new: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default router;