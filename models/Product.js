const mongoose = require('mongoose');
const Category = require('./Category');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Product name is required'],
        maxlength: [50, 'Product name cannot exceed 50 characters'],
        validate: {
            validator: function(v) {
                return /^[^\s].*[^\s]$/.test(v.trim()); // Validates that the name is not just whitespace
            },
            message: 'Product name cannot be empty or just whitespace'
        }
    },
    price: {
        type: Number,
        required: [true, 'Product price is required'],
        min: [0, 'Product price must be a positive number']
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: [true, 'Product category is required'],
        validate: {
            validator: async function(categoryId) {
                const category = await Category.findById(categoryId);
                return !!category; // returns true if category exists, otherwise false
            },
            message: 'Category not found in the database'
        }
    },
    ingredients: {
        type: [String],
        validate: [
            {
                validator: function(v) {
                    return v.length <= 30; // Array must not have more than 30 elements
                },
                message: 'Ingredients array can have a maximum of 30 elements'
            },
            {
                validator: function(v) {
                    return v.every(ingredient => ingredient.length <= 50); // Each string must be <= 50 characters
                },
                message: 'Each ingredient can have a maximum length of 50 characters'
            }
        ]
    },
    image: {
        type: String,
        maxlength: [50, 'Image URL can have a maximum length of 50 characters']
    }
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
