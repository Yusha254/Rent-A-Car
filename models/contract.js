const mongoose = require('mongoose');

const contractSchema = new mongoose.Schema({
  customer: {
    type: String,
    required: true,
  },
  carId: {
    type: String,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  // Other contract details as needed
});

const Contract = mongoose.model('Contract', contractSchema);

module.exports = Contract;