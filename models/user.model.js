const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
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
    cart: {
        type: Array,
        default: [],
    },
    isAdmin: {
        type: Boolean,
    },
    orders: {
        type: Array,
        default: [],
    },
    contact: {
        type: Number,
    },
    picture: {
        type: String,
    },
});

module.exports = mongoose.model("user", userSchema);