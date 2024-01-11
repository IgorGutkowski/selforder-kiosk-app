const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const Product = require('./models/Product');
const Category = require('./models/Category');
const Order = require('./models/Order');
const app = express();

app.use(express.json());
app.use(cors())

mongoose.connect('mongodb://localhost:27017/kioskDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Połączono z MongoDB');
}).catch(err => {
    console.error('Nie udało się połączyć z MongoDB', err);
});

// Endpoint do pobierania wszystkich produktów
app.get('/api/products', async (req, res) => {
    try {
        const products = await Product.find({});
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: "Błąd podczas pobierania produktów", error: error });
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

// Endpoint do pobierania produktów według kategorii
app.get('/api/products/category/:categoryName', async (req, res) => {
    try {
        const products = await Product.find({ category: req.params.categoryName });
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: "Błąd podczas pobierania produktów kategorii", error: error });
    }
});

// Endpoint do wyszukiwania produktów po nazwie
app.get('/api/products/search/:searchQuery', async (req, res) => {
    try {
        const searchRegex = new RegExp(req.params.searchQuery, 'i'); // 'i' dla case-insensitive
        const products = await Product.find({ name: searchRegex });
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: "Błąd podczas wyszukiwania produktów", error: error });
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



const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Serwer działa na porcie ${PORT}`);
});
