const express = require('express');
const { prisma } = require('../config');
const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const { message, userId } = req.body;

        if (!message) {
            return res.status(400).json({ error: 'Message is required' });
        }

        const feedback = await prisma.feedback.create({
            data: {
                message,
                userId: userId || null,
            }
        });

        res.status(201).json(feedback);
    } catch (error) {
        console.error('Error submitting feedback:', error);
        res.status(500).json({ error: 'Failed to submit feedback' });
    }
});

module.exports = router;
