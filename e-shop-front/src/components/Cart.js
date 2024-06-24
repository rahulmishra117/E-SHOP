import React, { useState } from 'react';
import PaymentForm from './PaymentForm';

const Cart = ({ cart, removeFromCart }) => {

  console.log("Cart details ", cart);
  const [showPaymentForm, setShowPaymentForm] = useState(false);

  const handlePlaceOrder = () => {
    setShowPaymentForm(true);
  };

  return (
    <div className="container mx-auto px-4">
      <h2 className="text-2xl font-bold mb-4">Cart</h2>
      {cart.length === 0 ? (
        <p className="text-gray-700">No items in cart</p>
      ) : (
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {cart.map((item, index) => (
              item.Product ? (
                <div key={index} className="max-w-sm rounded overflow-hidden shadow-lg p-4 bg-white">
                  <h4 className="text-xl font-bold mb-2">Name: {item.Product.name}</h4>
                  <p className="text-gray-700">Price: ${item.Product.price}</p>
                  <button
                    onClick={() => removeFromCart(item)}
                    className="mt-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <div key={index} className="max-w-sm rounded overflow-hidden shadow-lg p-4 bg-white">
                  <p className="text-gray-700">Product details are unavailable.</p>
                  <button
                    onClick={() => removeFromCart(item)}
                    className="mt-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Remove
                  </button>
                </div>
              )
            ))}
          </div>
          <div className="mt-4">
            <button
              onClick={handlePlaceOrder}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Place Order
            </button>
          </div>
          {showPaymentForm && <PaymentForm />}
        </div>
      )}
    </div>
  );
};

export default Cart;
