const express = require('express');
const mongoose = require('mongoose');
const Product = require('./models/Product'); // Załóżmy, że to jest Twój model produktu
const app = express();

app.use(express.json());

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

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Serwer działa na porcie ${PORT}`);
});
