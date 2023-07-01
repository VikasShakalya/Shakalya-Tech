// script.js
document.addEventListener('DOMContentLoaded', () => {
    const loginBtn = document.getElementById('loginBtn');
    const registerForm = document.getElementById('registerForm');
    const loginForm = document.getElementById('loginForm');
  
    // Show/hide registration and login forms
    loginBtn.addEventListener('click', () => {
      registerForm.style.display = 'none';
      loginForm.style.display = 'block';
    });
  
    registerForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const username = document.getElementById('username').value;
      const password = document.getElementById('password').value;
  
      // Perform registration logic (e.g., send data to the server)
      console.log(`Registered: username=${username}, password=${password}`);
    });
  
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const loginUsername = document.getElementById('loginUsername').value;
      const loginPassword = document.getElementById('loginPassword').value;
  
      // Perform login logic (e.g., send data to the server for verification)
      console.log(`Logged in: username=${loginUsername}, password=${loginPassword}`);
    });
  });
// app.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

// Connect to MongoDB
mongoose.connect('mongodb://localhost/myphotoshare', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define the user schema
const userSchema = new mongoose.Schema({
  username: String,
  password: String,
});

// Create the user model
const User = mongoose.model('User', userSchema);

// Register a new user
app.post('/register', (req, res) => {
  const { username, password } = req.body;
  
  // Check if the username already exists
  User.findOne({ username }, (err, existingUser) => {
    if (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    } else if (existingUser) {
      res.status(409).send('Username already exists');
    } else {
      // Create a new user
      const newUser = new User({ username, password });
      newUser.save((saveErr) => {
        if (saveErr) {
          console.error(saveErr);
          res.status(500).send('Internal Server Error');
        } else {
          res.status(200).send('Registration successful');
        }
      });
    }
  });
});

// Log in a user
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Find the user by username and password
  User.findOne({ username, password }, (err, user) => {
    if (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    } else if (user) {
      res.status(200).send('Login successful');
    } else {
      res.status(401).send('Invalid username or password');
    }
  });
});

// Start the server
app.listen(3000, () => {
  console.log('Server started on http://localhost:3000');
});
  