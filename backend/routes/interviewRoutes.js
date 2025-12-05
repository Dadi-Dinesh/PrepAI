const express = require('express');
const { analyzeInterview } = require('../services/aiService');
const { prisma } = require('../config');
const verifyToken = require('../middleware/verifyToken');

const router = express.Router();

router.post('/analyze', verifyToken, async (req, res) => {
    try {
        const { role, qna } = req.body;
        const userId = req.userId;

        if (!role || !qna || !Array.isArray(qna)) {
            return res.status(400).json({ error: 'Invalid input. Role and QnA array are required.' });
        }

        const analysis = await analyzeInterview(role, qna);

        // Save to database
        await prisma.interview.create({
            data: {
                userId,
                role,
                summary: analysis.summary || "No summary available",
                suggestions: analysis.suggestions || [],
            }
        });

        res.json(analysis);
    } catch (error) {
        console.error('Error in /analyze:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.get('/history', verifyToken, async (req, res) => {
    try {
        const userId = req.userId;
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 5;
        const sort = req.query.sort === 'oldest' ? 'asc' : 'desc';
        const roleFilter = req.query.role || undefined;
        const skip = (page - 1) * limit;

        const whereClause = {
            userId,
            ...(roleFilter && { role: roleFilter }),
        };

        const [interviews, total] = await Promise.all([
            prisma.interview.findMany({
                where: whereClause,
                orderBy: { date: sort },
                skip,
                take: limit,
            }),
            prisma.interview.count({ where: whereClause })
        ]);

        res.json({
            interviews,
            pagination: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit)
            }
        });
    } catch (error) {
        console.error('Error in /history:', error);
        res.status(500).json({ error: 'Failed to fetch history' });
    }
});

module.exports = router;
