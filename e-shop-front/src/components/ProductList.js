import React, { useState } from 'react';
import Product from './Product';
import Notification from './Notification'; 

const ProductList = ({ products, addToCart }) => {
  const [showNotification, setShowNotification] = useState(false); 


  const handleAddToCart = (product) => {
    addToCart(product); 
    setShowNotification(true); 
    setTimeout(() => setShowNotification(false), 3000); 
  };

  return (
    <div className="flex flex-wrap -mx-4">
      {products.map((product) => (
        <div key={product.id} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 px-4 mb-8">
          <Product product={product} addToCart={() => handleAddToCart(product)} /> 
        </div>
      ))}
      {showNotification && <Notification message="Product added to cart!" />} 
    </div>
  );
};

export default ProductList;
