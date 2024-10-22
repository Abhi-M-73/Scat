const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: true,
    },
    image: {
        buffer : Buffer,
    },
    price: {
        type: Number
    },
    discount: {
        type: Number,
        default: 0,
    },
    bgColor: {
        type: String
    },
    panelColor: {
        type: String
    },
    textColor: {
        type: String
    }
}); 

module.exports = mongoose.model("product", productSchema);