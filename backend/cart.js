// getting-started.js
const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
  const mongo_string = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/fruits-vegetables'
  await mongoose.connect(mongo_string);

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}


const cartSchema = new mongoose.Schema({
    name: String,
    img: String,
    price: String,
    quantity: { type: Number, default: 1 },
  });
  
  const Cart = mongoose.model('Cart', cartSchema);
  
  module.exports = Cart;