const path = require('path');
const express = require('express');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
// Models
const Product = require('./models/product');
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
app.use(express.urlencoded({ extended: true}));
app.use(methodOverride('_method'));

app.get('/', (req, res) => {
 res.send('Hello Ian')
});

app.get('/products', async (req, res) => {
 const { category } = req.query;
 if(category) {
  const products = await Product.find({ category });
  res.render('products/index', { products, category });
 } else {
  const products = await Product.find({});
  res.render('products/index', { products, category: 'All' });
 }
});

app.get('/products/create', (req, res) => {
 res.render('products/create');
});

app.post('/products', async (req, res) => {
 const product = new Product(req.body);
 await product.save();
 res.redirect(`/products/${product._id}`);
})

app.get('/products/:id', async (req, res) => {
 const {id} = req.params;
 const product = await Product.findById(id);
 res.render('products/show', {product});
});

app.get('/products/:id/edit', async (req, res) => {
 const {id} = req.params;
 const product = await Product.findById(id);
 res.render('products/edit', {product});
});

app.put('/products/:id', async (req, res) => {
 const {id} = req.params;
 const product = await Product.findByIdAndUpdate(id, req.body, {runValidators: true });
 res.redirect(`/products/${product._id}`);
});

app.delete('/products/:id', async (req, res) => {
 const {id} = req.params;
 await Product.findByIdAndDelete(id);
 res.redirect('/products');
})

app.listen(port, () => {
 console.log('Shop app listening on port http://127.0.0.1:8989');
})