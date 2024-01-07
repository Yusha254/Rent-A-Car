const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const Car = require('./models/car');
const Contract = require('./models/contract');
const loginRouter = require('./routes/login');
const signupRouter = require('./routes/signup');
const addCarRouter = require('./routes/addCar');
const deleteCarRouter = require('./routes/deleteCar');

const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
// Set the view engine to EJS
app.set('view engine', 'ejs');

// Set the views directory
app.set('views', path.join(__dirname, 'public'));

mongoose.connect('mongodb://127.0.0.1:27017/car_rental_database', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err.message);
  });


app.listen(3000, () => {
    console.log("Server Running on Port 3000");
  });

  app.use('/', loginRouter);
  app.use('/', signupRouter);
  app.use('/', addCarRouter);
  app.use('/', deleteCarRouter);

  app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/login.html");
  });

  app.get('/car-management', (req, res) => {
    Car.find({})
  .then(carsFromDB => {
    // Assuming carsFromDB is an array of car objects from the database
    const cars = carsFromDB.map(car => ({
      id: car.id,
      make: car.make,
      model: car.model,
    }));

    res.render('managestock', { cars: cars });
    console.log(cars);
  })
  .catch(error => {
    console.error('Error fetching cars from the database:', error);
  });
  
    
  });

  app.get('/cars', (req, res) => {
    Car.find({})
  .then(carsFromDB => {
    const cars = carsFromDB.map(car => ({
      id: car.id,
      make: car.make,
      model: car.model,
    }));

    res.render('cars', { cars: cars });
    
  });
});

app.get('/rentcar/:id', (req, res) => {
  // Extract the car ID from the request parameters
  const carId = req.params.id;

  // Render the rent-car.ejs view and pass the carId to it
  res.render('rentcar', { carId });
});

app.post('/makecontract/', async (req, res) => {
  
  try {
    // Extract data from the request body
    const { username, startDate, endDate, carId } = req.body;

    // Create a new contract instance with the collected data
    const newContract = new Contract({
      customer: username,
      carId: carId,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      // Other contract details as needed
    });

    // Save the new contract instance to the database
    await newContract.save();

    // Send a response indicating successful contract creation
    res.status(201).json({ message: 'Contract created successfully' });
  } catch (error) {
    console.error('Error creating contract:', error.message);
    res.status(500).json({ message: 'Error creating contract' });
  }
});