const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    imageUrl: {
        type: String,
        required: true,
    },
    universityName: {
        type: String,
        required: true,
    },
    learningHours: {
        type: String,
        required: true,
    },
    duration: {
        type: String,
        required: true,
    },
    facutltyProfileUrl: String,
    price: {
        type: Number,
        required: true,
    },
    certificateUrl: {
        type: String,
        required: true,
    },
    eligibilityCriteria: {
        type: String,
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
});

module.exports = mongoose.model('Course', courseSchema);
