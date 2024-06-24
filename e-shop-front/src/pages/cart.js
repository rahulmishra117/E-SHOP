// pages/cart.js
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Cart from '../components/Cart';

const CartPage = () => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    fetch('http://localhost:4000/cart')
      .then(response => response.json())
      .then(data => setCart(data));
  }, []);

  const removeFromCart = (product) => {
    console.log("Product",product);
    // This should ideally interact with the backend to remove the item from the cart.
    // For simplicity, we'll just filter it out from the state.
    setCart(cart.filter(item => item.productId !== product.id));
  };

  const placeOrder = () => {
    alert('Order placed successfully!');
    setCart([]);
  };

  return (
    <div className="container">
      <div className="container mx-auto px-4 flex items-center p-12">
        <Link href="/" className="ml-4"><p className='font-bold text-left'>Back to Products</p></Link>
      </div>
      <Cart cart={cart} removeFromCart={removeFromCart} placeOrder={placeOrder} />
    </div>
  );
};

export default CartPage;
