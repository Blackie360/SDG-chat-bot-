import express from 'express';
import { auth } from '../middleware/auth.js';
import Order from '../models/order.js';
import Product from '../models/product.js';

const router = express.Router();

// Create order
router.post('/', auth, async (req, res) => {
  try {
    const { items, shippingAddress } = req.body;
    
    // Validate and calculate total
    let total = 0;
    const orderItems = [];
    
    for (const item of items) {
      const product = await Product.findById(item.product);
      if (!product) {
        return res.status(400).json({ error: `Product ${item.product} not found` });
      }
      if (product.stock < item.quantity) {
        return res.status(400).json({ error: `Insufficient stock for ${product.name}` });
      }
      
      orderItems.push({
        product: item.product,
        quantity: item.quantity,
        price: product.price
      });
      
      total += product.price * item.quantity;
      
      // Update stock
      product.stock -= item.quantity;
      await product.save();
    }
    
    const order = new Order({
      user: req.user._id,
      items: orderItems,
      total,
      shippingAddress
    });
    
    await order.save();
    res.status(201).json(order);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get order details
router.get('/:id', auth, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('user', 'name email')
      .populate('items.product', 'name price');
      
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }
    
    if (order.user._id.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Access denied' });
    }
    
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get user orders
router.get('/user/:userId', auth, async (req, res) => {
  try {
    if (req.user._id.toString() !== req.params.userId && req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Access denied' });
    }
    
    const orders = await Order.find({ user: req.params.userId })
      .populate('items.product', 'name price')
      .sort('-createdAt');
      
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update order status (admin only)
router.put('/:id/status', auth, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Access denied' });
    }
    
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status, updatedAt: new Date() },
      { new: true }
    );
    
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }
    
    res.json(order);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default router;