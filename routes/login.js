const express = require ('express');
const path = require('path');
const router = express.Router();
const User = require('../models/user'); // Import the User model

// Define the route handler for login
router.post('/login', (req, res) => {
  // Retrieve username and password values from the request body
  const { username, password } = req.body;

  // Find the user in the database based on the username
  console.log(username, password);
  User.findOne({ username : username })
    .then(user => {
      if (user) {
        // User found in the database, handle the login logic
        if (user.password === password) {
          console.log('Successfully logged in');
          return res.status(200).sendFile(path.join(__dirname, "../public/home.html"));
        } else {
          console.log('Invalid credentials');
          return res.status(401).json({ message: 'Invalid credentials' });
        }
      } else {
        // User not found in the database, handle the invalid credentials case
        console.log('Invalid credentials');
        return res.status(401).json({ message: 'Invalid credentials' });
      }
      
      
    })
    .catch(err => {
      console.error('Error finding user:', err.message);
      res.status(500).json({ message: 'Error finding user' });
    });
});

module.exports = router;