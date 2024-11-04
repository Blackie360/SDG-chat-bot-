import express from 'express';
import { auth } from '../middleware/auth.js';
import Cart from '../models/cart.js';
import Product from '../models/product.js';

const router = express.Router();

// Add/Update cart item
router.post('/:userId', auth, async (req, res) => {
  try {
    if (req.user._id.toString() !== req.params.userId) {
      return res.status(403).json({ error: 'Access denied' });
    }

    const { productId, quantity } = req.body;
    const product = await Product.findById(productId);
    
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    
    if (product.stock < quantity) {
      return res.status(400).json({ error: 'Insufficient stock' });
    }

    let cart = await Cart.findOne({ user: req.params.userId });
    
    if (!cart) {
      cart = new Cart({
        user: req.params.userId,
        items: [{ product: productId, quantity }]
      });
    } else {
      const itemIndex = cart.items.findIndex(item => 
        item.product.toString() === productId
      );
      
      if (itemIndex > -1) {
        cart.items[itemIndex].quantity = quantity;
      } else {
        cart.items.push({ product: productId, quantity });
      }
      cart.updatedAt = new Date();
    }

    await cart.save();
    
    const populatedCart = await Cart.findById(cart._id)
      .populate('items.product', 'name price stock');
    
    res.json(populatedCart);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get cart
router.get('/:userId', auth, async (req, res) => {
  try {
    if (req.user._id.toString() !== req.params.userId) {
      return res.status(403).json({ error: 'Access denied' });
    }

    const cart = await Cart.findOne({ user: req.params.userId })
      .populate('items.product', 'name price stock');
      
    if (!cart) {
      return res.status(404).json({ error: 'Cart not found' });
    }
    
    res.json(cart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Remove item from cart
router.delete('/:userId/item/:itemId', auth, async (req, res) => {
  try {
    if (req.user._id.toString() !== req.params.userId) {
      return res.status(403).json({ error: 'Access denied' });
    }

    const cart = await Cart.findOne({ user: req.params.userId });
    
    if (!cart) {
      return res.status(404).json({ error: 'Cart not found' });
    }
    
    cart.items = cart.items.filter(item => 
      item.product.toString() !== req.params.itemId
    );
    cart.updatedAt = new Date();
    
    await cart.save();
    
    const populatedCart = await Cart.findById(cart._id)
      .populate('items.product', 'name price stock');
    
    res.json(populatedCart);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default router;