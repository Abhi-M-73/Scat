const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    productName: {
        type: String,
        required: true,
    },
    image: {
        type: String
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