// pages/index.js
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import ProductList from '../components/ProductList';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    fetch('http://localhost:4000/products')
      .then(response => response.json())
      .then(data => setProducts(data));
  }, []);

  const addToCart = (product) => {
    fetch('http://localhost:4000/cart', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ productId: product.id, quantity: 1 }),
    })
      .then(response => response.json())
      .then(data => {
        if (data.message === 'Order placed successfully!') {
          setCart([...cart, product]);
        }
      });
  };

  return (
    <div className="container">
      <h1 className="text-center text-black text-2xl font-bold">E-COM SHOP</h1>
      <div className="flex justify-between items-center">
        <Link href="/cart">
        <button className="mt-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Go to Cart</button>

        </Link>
      </div>
      <ProductList products={products} addToCart={addToCart} />
    </div>
  );
};

export default Home;
