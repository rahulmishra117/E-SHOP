const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Product, Order } = require('./models');
const stripe = require('stripe')('secret-key');
const app = express();
app.use(bodyParser.json());
app.use(cors());

app.post('/create-payment-intent', async (req, res) => {
  try {
    const { amount, currency } = req.body;
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
    });
    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error('Error creating payment intent:', error);
    res.status(500).json({ error: 'An error occurred while creating payment intent' });
  }
});



app.get('/products', async (req, res) => {
  const products = await Product.findAll();
  // console.log("\n Products In Database \n",products);
  res.json(products);
});
app.post('/products', async (req, res) => {
  // console.log('req body',req.body);
  const { name, price, stock } = req.body;
  console.log("Products details",name,price,stock);
  const product = await Product.create({ name, price, stock });
  res.status(201).json(product);
});

app.put('/products/:id', async (req, res) => {
  const { id } = req.params;
  const { name, price, stock } = req.body;
  const product = await Product.findByPk(id);
  if (product) {
    product.name = name;
    product.price = price;
    product.stock = stock;
    await product.save();
    res.json(product);
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
});

app.delete('/products/:id', async (req, res) => {
  console.log("Dete Request:- ",req.params);
  const { id } = req.params;
  const product = await Product.findByPk(id);
  if (product) {
    await product.destroy();
    res.status(204).end();
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
});





app.post('/cart', async (req, res) => {
  const { productId, quantity } = req.body;
  const product = await Product.findByPk(productId);
  if (product && product.stock >= quantity) {
    await Order.create({ productId, quantity });
    product.stock -= quantity;
    await product.save();
    res.status(201).json({ message: 'Order placed successfully!' });
  } else {
    res.status(400).json({ message: 'Insufficient stock or invalid product.' });
  }
});

app.get('/cart', async (req, res) => {
  const orders = await Order.findAll({ include: [Product] });
  res.json(orders);
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

