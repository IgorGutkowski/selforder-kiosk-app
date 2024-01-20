const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Category name is required'],
        maxlength: [50, 'Category name cannot exceed 50 characters'],
        validate: {
            validator: function(v) {
                return /^[^\s].*[^\s]$/.test(v); // Regex to ensure the string has non-whitespace characters at both ends
            },
            message: 'Category name cannot be empty or just whitespace'
        }
    }
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
