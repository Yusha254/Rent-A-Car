const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.post('/signup', async (req, res) => {
  try {
    // Extract the data from the request body
    const { username, password, repeatPassword, userType } = req.body;
    console.log("Username is: " + username + " Password is: " + password);

    // Check if the passwords match
    if (password != repeatPassword) {
      console.log("Repeat Password is: " + repeatPassword)  
      return res.status(400).json({ message: 'The two passwords do not match' });
    }

    // Create a new instance of the User model with the collected data
    const newUser = new User({
      username: username,
      password: password,
      userType: userType
    });

    // Save the new user instance to the database
    await newUser.save();

    // Send a response indicating successful registration
    res.status(201).json({ message: 'User registration successful' });
  } catch (error) {
    console.error('Error registering user:', error.message);
    res.status(500).json({ message: 'Error registering user' });
  }
});

module.exports = router;