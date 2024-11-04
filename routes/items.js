import express from 'express';
import { auth } from '../middleware/auth.js';
import Item from '../models/item.js';

const router = express.Router();

// Create item
router.post('/', auth, async (req, res) => {
  try {
    const item = new Item({
      ...req.body,
      user: req.user._id
    });
    await item.save();
    res.status(201).json(item);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all items for authenticated user
router.get('/', auth, async (req, res) => {
  try {
    const items = await Item.find({ user: req.user._id });
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get single item
router.get('/:id', auth, async (req, res) => {
  try {
    const item = await Item.findOne({ _id: req.params.id, user: req.user._id });
    if (!item) return res.status(404).json({ error: 'Item not found' });
    res.json(item);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update item
router.put('/:id', auth, async (req, res) => {
  try {
    const item = await Item.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      { ...req.body, updatedAt: new Date() },
      { new: true }
    );
    if (!item) return res.status(404).json({ error: 'Item not found' });
    res.json(item);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete item
router.delete('/:id', auth, async (req, res) => {
  try {
    const item = await Item.findOneAndDelete({ _id: req.params.id, user: req.user._id });
    if (!item) return res.status(404).json({ error: 'Item not found' });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;