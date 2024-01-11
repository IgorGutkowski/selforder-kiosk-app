const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    number: { type: String, required: true, unique: true },
    date: { type: Date, default: Date.now },
    products: [{ product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' } }],
    remarks: String,
    price: { type: Number, required: true },
    takeAway: { type: Boolean, default: false }
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
