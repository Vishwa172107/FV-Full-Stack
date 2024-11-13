const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path =require('path')


const Fruit = require('./backend/fruits');
const Vegetable = require('./backend/vegetables');
const Cart = require('./backend/cart');

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');


mongoose.connect(process.env.MONGODB_URI).then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Error connecting to MongoDB:', err));


app.get('/api/fruits', async (req, res) => {
  try {
    const fruits = await Fruit.find();
    res.json(fruits);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching fruits' });
  }
});


app.get('/api/vegetables', async (req, res) => {
  try {
    const vegetables = await Vegetable.find();
    res.json(vegetables);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching vegetables' });
  }
});

app.post('/api/add-to-cart', async (req, res) => {
  const { name, img, price } = req.body;

  try {
  
    let cartItem = await Cart.findOne({ name });

    if (cartItem) {
    
      cartItem.quantity += 1;
      await cartItem.save();
    } else {
     
      cartItem = new Cart({ name, img, price, quantity: 1 });
      await cartItem.save();
    }

    res.status(201).json({ message: 'Item added to cart', cartItem });
  } catch (error) {
    res.status(500).json({ error: 'Error adding item to cart' });
  }
});

app.get('/cart', async (req, res) => {
  try {
    const cartItems = await Cart.find();
    res.render('cart.ejs', { cartItems });
    
  } catch (error) {
    res.status(500).send('Error loading cart');
  }
});

app.get('/delete-cart-item/:id', async (req, res) => {
  try {
    await Cart.findByIdAndDelete(req.params.id);
    res.redirect('/cart');
  } catch (error) {
    res.status(500).send('Error deleting item from cart');
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
