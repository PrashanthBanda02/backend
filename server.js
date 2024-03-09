// backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const app = express();
const port = 3001;

app.use(express.json()); 

app.use(async (req, res, next) => {
    if (req.body && req.body.password) {
      req.body.password = await bcrypt.hash(req.body.password, 10);
    }
    next();
  });
  

mongoose.connect('mongodb://127.0.0.1:27017/ecommerce', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  // Remove the deprecated option and add the new ones
  serverSelectionTimeoutMS: 5000, // timeout after 5 seconds instead of using the deprecated useUnifiedTopology option
  socketTimeoutMS: 45000, // close sockets after 45 seconds of inactivity
});

const connection = mongoose.connection;
connection.once('open', () => {
  console.log('MongoDB connection established successfully');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

const User = require('./src/src/User');

app.post('/register', async (req, res) => {
    try {
      const user = await User.create(req.body);
      res.status(201).json({ user });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });