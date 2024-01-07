const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
    },
    make: {
        type: String,
        required: true,
    },
    model: {
        type: String,
        required: true,
    },
    isRented: {
        type: Boolean,
        default: false,
    }
});

const Car = mongoose.model('Car', carSchema);

module.exports = Car;