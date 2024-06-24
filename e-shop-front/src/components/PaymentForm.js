import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';

const PaymentForm = ({ amount, currency, onPaymentSuccess, onPaymentFailure }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);
    setErrorMessage('');

    if (!stripe || !elements) {
      setIsLoading(false);
      setErrorMessage('Failed to initialize payment.');
      return;
    }

    const cardElement = elements.getElement(CardElement);

    try {
      const { data } = await axios.post('/create-payment-intent', { amount, currency });
      const result = await stripe.confirmCardPayment(data.clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            name: 'Customer Name',
          },
        },
      });

      if (result.error) {
        setIsLoading(false);
        setErrorMessage(result.error.message);
        onPaymentFailure(result.error.message);
      } else {
        setIsLoading(false);
        onPaymentSuccess();
      }
    } catch (error) {
        setIsLoading(false);
  setErrorMessage('An error occurred while processing payment.');
  console.error('Error processing payment:', error);
  if (onPaymentFailure) {
    onPaymentFailure('An error occurred while processing payment.');
  }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto">
      <div className="bg-white rounded-lg shadow-sm mb-4">
        <label htmlFor="card" className="block mb-2 text-2xl  font-semibold text-gray-800">Card Details</label>
        <div className="bg-white rounded-lg shadow-sm p-4">
          <CardElement id="card" options={{
            style: {
              base: {
                fontSize: '16px',
                color: '#424770',
                '::placeholder': {
                  color: '#aab7c4',
                },
              },
              invalid: {
                color: '#9e2146',
              },
            },
          }} />
        </div>
      </div>
      <button type="submit" className="bg-blue-500 text-white font-semibold py-2 px-4 rounded disabled:bg-gray-400 disabled:cursor-not-allowed">
        {isLoading ? 'Processing...' : 'Pay'}
      </button>
      {errorMessage && <div className="text-red-600 mt-2">{errorMessage}</div>}
    </form>
  );
};

export default PaymentForm;
