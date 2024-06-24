import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import '../../globals.css';

const stripePromise = loadStripe('passkey');

function MyApp({ Component, pageProps }) {
  return (
  <Elements stripe={stripePromise}>
   <Component {...pageProps} /> </Elements> 
   )
}

export default MyApp;
