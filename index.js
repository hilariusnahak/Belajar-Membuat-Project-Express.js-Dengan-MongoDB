const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 8989;

// connect to mongodb
mongoose.connect('mongodb://127.0.0.1/shop_db').then((result) => {
 console.log('Connected to MongoDB');
}).catch((err) => {
 console.log(err);
});

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
 res.send('Hello Ian')
});

app.listen(port, () => {
 console.log('Shop app listening on port http://127.0.0.1:8989');
})