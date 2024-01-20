require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const Product = require('./models/Product');
const Category = require('./models/Category');
const Order = require('./models/Order');
const adminAuth = require('./middleware/adminAuth'); // Make sure to create this middleware
const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGODB_URI, { // Make sure MONGODB_URI is in your .env file
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('Failed to connect to MongoDB', err);
});

// Public endpoints
app.get('/api/products', async (req, res) => {
    try {
        const products = await Product.find({});
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: "Error fetching products", error });
    }
});

app.get('/api/categories', async (req, res) => {
    try {
        const categories = await Category.find({});
        res.json(categories);
    } catch (error) {
        res.status(500).json({ message: "Error fetching categories", error });
    }
});

app.get('/api/products/category/:categoryName', async (req, res) => {
    try {
        const providedCategoryName = req.params.categoryName;
        const regexCategoryName = new RegExp(providedCategoryName, 'i'); // Create a case-insensitive regex

        // Query the database using the regex for case-insensitive search
        const products = await Product.find({ category: regexCategoryName });

        if (products.length === 0) {
            throw new Error('Category not found in the database');
        }

        res.json(products);
    } catch (error) {
        res.status(500).json({ message: "Error fetching products by category", error });
    }
});



app.get('/api/products/search/:searchQuery', async (req, res) => {
    try {
        const searchRegex = new RegExp(req.params.searchQuery, 'i');
        const products = await Product.find({ name: searchRegex });
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: "Error searching products", error });
    }
});

app.post('/api/orders', async (req, res) => {
    try {
        const newOrder = new Order({
            number: req.body.number,
            date: req.body.date,
            products: req.body.products.map(product => ({ product: product._id })),
            remarks: req.body.remarks,
            price: req.body.price,
            takeAway: req.body.takeAway
        });

        await newOrder.save();
        res.status(201).json(newOrder);
    } catch (error) {
        res.status(500).json({ message: "Error submitting the order", error });
    }
});

// Admin routes


app.post('/api/admin/login', (req, res) => {
    const adminKey = req.header('Admin-Secret-Key');
    console.log('Received Admin Key:', adminKey); // Debugging line

    if (adminKey === process.env.ADMIN_SECRET_KEY) {
        res.json({ message: "Admin authenticated successfully" });
    } else {
        res.status(401).json({ message: "Unauthorized access." });
    }
});



app.post('/api/admin/products', adminAuth, async (req, res) => {
    try {
        const newProduct = new Product(req.body);
        await newProduct.save();
        res.status(201).json(newProduct);
    } catch (error) {
        if (error.name === 'ValidationError') {
            return res.status(400).json({ message: "Validation Error", error: error.message });
        }
        res.status(500).json({ message: "Error creating product", error });
    }
});


// Update an existing product
app.put('/api/admin/products/:id', adminAuth, async (req, res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!updatedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.json(updatedProduct);
    } catch (error) {
        if (error.name === 'ValidationError') {
            return res.status(400).json({ message: "Validation Error", error: error.message });
        }
        res.status(500).json({ message: "Error updating product", error });
    }
});


// Delete a product
app.delete('/api/admin/products/:id', adminAuth, async (req, res) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);

        if (!deletedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting product", error });
    }
});


// Create a new category
app.post('/api/admin/categories', adminAuth, async (req, res) => {
    try {
        const newCategory = new Category(req.body);
        await newCategory.save();
        res.status(201).json(newCategory);
    } catch (error) {
        res.status(500).json({ message: "Error creating category", error });
    }
});

// Update an existing category
app.put('/api/admin/categories/:id', adminAuth, async (req, res) => {
    try {
        const updatedCategory = await Category.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true,
                context: 'query' // This ensures validators are run
            }
        );

        if (!updatedCategory) {
            return res.status(404).json({ message: "Category not found" });
        }

        res.json(updatedCategory);
    } catch (error) {
        res.status(500).json({ message: "Error updating category", error });
    }
});



// Delete a category
app.delete('/api/admin/categories/:id', adminAuth, async (req, res) => {
    try {
        const deletedCategory = await Category.findByIdAndDelete(req.params.id);
        if (!deletedCategory) {
            return res.status(404).json({ message: "Category not found" });
        }
        res.status(200).json({ message: "Category deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting category", error });
    }
});



//stats
app.get('/api/admin/statistics/orders', adminAuth, async (req, res) => {
    const { startDate, endDate } = req.query;
    try {
        const orders = await Order.aggregate([
            {
                $match: {
                    date: {
                        $gte: new Date(startDate),
                        $lte: new Date(endDate)
                    }
                }
            },
            {
                $group: {
                    _id: null,
                    takeAwayCount: { $sum: { $cond: [{ $eq: ['$takeAway', true] }, 1, 0] } },
                    dineInCount: { $sum: { $cond: [{ $eq: ['$takeAway', false] }, 1, 0] } },
                    totalTakeAwayPrice: { $sum: { $cond: [{ $eq: ['$takeAway', true] }, '$price', 0] } },
                    totalDineInPrice: { $sum: { $cond: [{ $eq: ['$takeAway', false] }, '$price', 0] } },
                    totalPrice: { $sum: '$price' }
                }
            },
            {
                $project: {
                    _id: 0,
                    takeAwayCount: 1,
                    dineInCount: 1,
                    totalTakeAwayPrice: 1,
                    totalDineInPrice: 1,
                    totalPrice: 1
                }
            }
        ]);

        if (orders.length > 0) {
            res.json(orders[0]);
        } else {
            res.status(404).json({ message: "No orders found for the given date range" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error fetching order statistics", error });
    }
});




const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
