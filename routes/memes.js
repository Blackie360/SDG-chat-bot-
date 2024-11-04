const express = require('express');
const Meme = require('../models/Meme');
const jwt = require('jsonwebtoken');

const router = express.Router();

// Middleware to verify JWT
const authenticateJWT = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1];
    if (!token) return res.sendStatus(403);

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
};

// Post a Meme
router.post('/', authenticateJWT, async (req, res) => {
    const { imageUrl, caption } = req.body;
    const meme = new Meme({ userId: req.user.id, imageUrl, caption });

    try {
        await meme.save();
        res.status(201).json(meme);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Get All Memes
router.get('/', async (req, res) => {
    try {
        const memes = await Meme.find().populate('userId', 'username');
        res.json(memes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
