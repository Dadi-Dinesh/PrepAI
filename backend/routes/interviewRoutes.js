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

router.delete('/:id', verifyToken, async (req, res) => {
    try {
        const userId = req.userId;
        const interviewId = req.params.id;

        // Verify ownership
        const interview = await prisma.interview.findUnique({
            where: { id: interviewId },
        });

        if (!interview) {
            return res.status(404).json({ error: 'Interview not found' });
        }

        if (interview.userId !== userId) {
            return res.status(403).json({ error: 'Unauthorized' });
        }

        await prisma.interview.delete({
            where: { id: interviewId },
        });

        res.json({ message: 'Interview deleted successfully' });
    } catch (error) {
        console.error('Error in DELETE /:id:', error);
        res.status(500).json({ error: 'Failed to delete interview' });
    }
});

router.put('/:id', verifyToken, async (req, res) => {
    try {
        const userId = req.userId;
        const interviewId = req.params.id;
        const { notes } = req.body;

        // Verify ownership
        const interview = await prisma.interview.findUnique({
            where: { id: interviewId },
        });

        if (!interview) {
            return res.status(404).json({ error: 'Interview not found' });
        }

        if (interview.userId !== userId) {
            return res.status(403).json({ error: 'Unauthorized' });
        }

        const updatedInterview = await prisma.interview.update({
            where: { id: interviewId },
            data: { notes },
        });

        res.json(updatedInterview);
    } catch (error) {
        console.error('Error in PUT /:id:', error);
        res.status(500).json({ error: 'Failed to update interview' });
    }
});

module.exports = router;
