const express = require('express');
const mongoose = require('mongoose');
const app = express();

mongoose.connect('mongodb://localhost:27017/kioskDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Połączono z MongoDB');
}).catch(err => {
    console.error('Nie udało się połączyć z MongoDB', err);
});

app.get('/', (req, res) => {
    res.send('Witaj w aplikacji kioskowej!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Serwer działa na porcie ${PORT}`);
});
