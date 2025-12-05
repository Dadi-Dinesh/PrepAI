const { prisma } = require('../config');
const jwt = require('jsonwebtoken');
const express = require('express');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
dotenv.config();

const router = express.Router();

router.post('/signup', async (req, res) => {
  const { email, password, name } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: { email, password: hashedPassword, name },
    });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ error: 'User registration failed' });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(401).json({ error: 'User not Found' });
    }
    const comparePassword = await bcrypt.compare(password, user.password);

    if (!comparePassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
    res.status(200).json({ message: 'Login successful', token: token });
  } catch (error) {
    console.log(error)
    res.status(400).json({ error: 'Login failed' });
  }
});

module.exports = router;