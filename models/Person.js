const mongoose = require('mongoose');

const PersonSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    gender: {
        type: String,
        enum: ['male', 'female'],
        required: true
    },
    country: {
        type: String,
        required: true
    },
    scores: {
        type: [Number],
        required: true
    }
});

module.exports = mongoose.model('Person', PersonSchema);