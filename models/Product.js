const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: String,
    price: Number,
    category: String,
    ingredients: [String],
    image: String
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;