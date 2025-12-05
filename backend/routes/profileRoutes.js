const verifyToken = require('../middleware/verifyToken');
const { prisma } = require('../config');
const express = require('express');

const router = express.Router();

router.get('/', verifyToken, async (req, res) => {
  try {
    const userId = req.userId;
    const userProfile = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        email: true,
        name: true,
        role: true,
        experience: true,
        location: true,
        createdAt: true,
        updatedAt: true
      },
    });
    res.status(200).json(userProfile);
  } catch (error) {
    res.status(400).json({ error: 'Failed to fetch profile' });
  }
});

router.put('/', verifyToken, async (req, res) => {
  try {
    const userId = req.userId;
    const { name, role, experience, location } = req.body;

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { name, role, experience, location },
      select: {
        email: true,
        name: true,
        role: true,
        experience: true,
        location: true,
        createdAt: true,
        updatedAt: true
      },
    });
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(400).json({ error: 'Failed to update profile' });
  }
});

module.exports = router;