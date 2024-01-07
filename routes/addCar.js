const express = require ('express');
const router = express.Router();
const car = require('../models/car');

router.post ('/addCar' , async (req, res) => {
    try {
        // Extract the data from the request body
        const { id, make, model } = req.body;

        // Create a new instance of the Car model with the collected data
        const newCar = new car({
            id: id,
            make : make,
            model : model
        });

            // Save the newCar instance to the database
            await newCar.save();
            // Send a response indicating successful registration
            res.status(201).json({ message: 'Car registration successful' }); 
      } catch (error) {
        console.error('Error registering car:', error.message);
        res.status(500).json({ message: 'Error registering car' });
      }
})

module.exports = router;