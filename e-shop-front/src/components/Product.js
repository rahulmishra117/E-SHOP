import React from 'react';

const Product = ({ product, addToCart }) => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg m-4" style={{ height: '200px', padding: '20px' }}>
      <div className="px-6 py-4">
        <h3 className="font-bold text-xl mb-2">Name:{product.name}</h3>
        <p className="text-gray-700 text-base">Price: ${product.price}</p>
        <button
          onClick={() => addToCart(product)}
          className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Add to Cart
        </button>
      </div>
    </div>

  );
};

export default Product;

