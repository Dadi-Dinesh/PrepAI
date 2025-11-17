const { verifyToken } = require('../middleware/verifyToken');
const { prisma } = require('@prisma/client');
const express = require('express');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const userId = req.userId;
    const userProfile = await prisma.user.findUnique({
      where: { id: userId },
      select: { email: true, createdAt: true, updatedAt: true },
    });
    res.status(200).json(userProfile);
  } catch (error) {
    res.status(400).json({ error: 'Failed to fetch profile' });
  }
})

module.exports = router;