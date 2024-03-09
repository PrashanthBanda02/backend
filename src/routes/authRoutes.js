// src/routes/authRoutes.js
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });

    // If user not found or password does not match, return an error
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // If credentials are valid, generate a JWT token
    const token = generateAuthToken(user._id, user.email);

    // Send the token in the response
    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// JWT Token Generation Function
function generateAuthToken(userId, userEmail) {
  const secretKey = 'secret-key'; // Replace with a strong and secure secret key
  const token = jwt.sign({ userId, userEmail }, secretKey, { expiresIn: '30m' });
  return token;
}


router.get('/profile', verifyToken, async (req, res) => {
  try {
    // Fetch user details using the user's ID stored in req.userId
    const user = await User.findById(req.userId, { password: 0 }); // Exclude password from the response

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


router.put('/profile', verifyToken, async (req, res) => {
  try {
    const { name, email } = req.body;

    // Fetch the user by ID
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Update user's information
    user.name = name || user.name;
    user.email = email || user.email;

    // Save the updated user
    await user.save();

    res.json({ user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
