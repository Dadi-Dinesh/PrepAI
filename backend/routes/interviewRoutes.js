const express = require('express');
const { analyzeInterview } = require('../services/aiService');

const router = express.Router();

router.post('/analyze', async (req, res) => {
    try {
        const { role, qna } = req.body;

        if (!role || !qna || !Array.isArray(qna)) {
            return res.status(400).json({ error: 'Invalid input. Role and QnA array are required.' });
        }

        const analysis = await analyzeInterview(role, qna);
        res.json(analysis);
    } catch (error) {
        console.error('Error in /analyze:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
