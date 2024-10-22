const mongoose = require('mongoose');

const ownerSchema = new mongoose.Schema({
    fullName: {
        type: String,
        minLength: 3,
        trim: true,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    products: {
        type: Array,
        default: [],
    },
    picture: {
        type: String,
    },
    gstNo: {
        type: String
    }
});

module.exports = mongoose.model("owner", ownerSchema);