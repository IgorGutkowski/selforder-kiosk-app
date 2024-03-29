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
        type: String,
        required: [true, 'Product category is required'],
        validate: {
            validator: async function(categoryName) {
                const category = await Category.findOne({ name: categoryName });
                return !!category; // Returns true if category exists, otherwise false
            },
            message: 'Category not found in the database'
        }
    },
    ingredients: {
        type: [String],
        validate: [
            {
                validator: function(v) {
                    return v.length <= 30;
                },
                message: 'Ingredients array can have a maximum of 30 elements'
            },
            {
                validator: function(v) {
                    return v.every(ingredient => ingredient.length <= 50);
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
