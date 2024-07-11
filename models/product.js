const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
 name: {
  type: String,
  required: [true, 'Nama tidak boleh kosong']
 },
		brand: {
   type: String,
   required: [true, 'Brand tidak boleh kosong']
  },
		price: {
   type: Number,
   required: [true, 'Harga tidak boleh kosong']
  },
		color: {
   type: String,
   required: [true, 'Color tidak boleh kosong']
  },
		category: {
   type: String,
   enum: ['Baju', 'Celana', 'Aksesoris', 'Jaket']
  }
})

const Product = mongoose.model('Product', productSchema);

module.exports = Product;