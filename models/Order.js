const mongoose = require('mongoose');
const Product = require('./Product');

const orderSchema = new mongoose.Schema({
    number: {
        type: String,
        required: [true, 'Order number is required'],
    },
    date: {
        type: Date,
        default: Date.now
    },
    products: [{
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: [true, 'Product reference is required'],
            validate: {
                validator: async function(productId) {
                    const product = await Product.findById(productId);
                    return !!product; // Returns true if product exists, otherwise false
                },
                message: 'Product not found in the database'
            }
        }
    }],
    remarks: {
        type: String,
        maxlength: [200, 'Remarks cannot exceed 200 characters']
    },
    price: {
        type: Number,
        required: [true, 'Total price is required'],
        min: [0, 'Total price must be a positive number']
    },
    takeAway: {
        type: Boolean,
        required: [true, 'TakeAway option is required'],
        default: false

    }});

const Order = mongoose.model('Order', orderSchema);


module.exports = Order;
