const express = require ('express');
const router = express.Router();
const Car = require('../models/car');

router.post ('/deleteCar' , async (req, res) => {
    try {
        // Extract the data from the request body
        const { deleteCarId } = req.body;

        // Create a new instance of the Car model with the collected data
        Car.findOne({ id : deleteCarId })
            .then(car => {
                if (car) {
                    // Car found in the database, handle the delete logic
                    Car.deleteOne({ id: deleteCarId })
                        .then(() => {
                            console.log('Car deleted successfully');
                            return res.status(200).json({ message: 'Car deleted successfully' });
                        })
            .catch(error => {
                console.error('Error deleting car:', error.message);
                return res.status(500).json({ message: 'Error deleting car' });
            });
                } else {
                    // Car not found in the database, handle the invalid id case
                    console.log('Invalid id');
                    return res.status(401).json({ message: 'Invalid id' });
                }
      
      
    })
    .catch(err => {
      console.error('Error finding user:', err.message);
      res.status(500).json({ message: 'Error finding user' });
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