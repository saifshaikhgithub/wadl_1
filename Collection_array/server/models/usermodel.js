const mongoose = require('mongoose');

const UserModel = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    rollno: {
        type: Number,
        required: true
    },
    wad_marks: {
        type: Number,
        required: true
    },
    dsbda_marks: {
        type: Number,
        required: true
    },
    cc_marks: {
        type: Number,
        required: true
    },
    cns_marks: {
        type: Number,
        required: true
    }
});

const Usermodel = mongoose.model('Student', UserModel);

module.exports = Usermodel;
