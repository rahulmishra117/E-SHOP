import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import '../../globals.css';

const stripePromise = loadStripe('pk_test_51PV7ifDvizZnc7i4OP8p96ig03N7bE1CdeNRBfQzBWafTWSz872lbFkAEkqA4zEqEykM4qvyPTpX4YpEBMjbqKWd00t79nuQ6w');

function MyApp({ Component, pageProps }) {
  return (
  <Elements stripe={stripePromise}>
   <Component {...pageProps} /> </Elements> 
   )
}

export default MyApp;
