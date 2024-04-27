const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    cns_marks: {
        type: Number,
        default: 0
    },
    wadl_marks: {
        type: Number,
        default: 0
    }
});

module.exports = mongoose.model('users', studentSchema);
