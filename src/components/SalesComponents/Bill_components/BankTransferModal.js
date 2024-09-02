import React from 'react';
import Modal from 'react-modal';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useElements, useStripe } from '@stripe/react-stripe-js';

// Your publishable key from Stripe
const stripePromise = loadStripe('pk_test_51PuYUMLOIjdE9KSZzxElLVI0vZ2BHdGyHCgsx1vdL7KGGHMxFn2E7rhkKMM9TWA3v8kYRTjm2cRO0Ve2lf7UdP8b00tyyGXNxE');

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) return;

    // Create a PaymentIntent on your server
    const { clientSecret } = await fetch('/create-payment-intent', {
      method: 'POST',
    }).then(res => res.json());

    const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
      },
    });

    if (error) {
      console.error(error);
    } else if (paymentIntent.status === 'succeeded') {
      console.log('Payment successful!');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button type="submit" disabled={!stripe}>
        Pay
      </button>
    </form>
  );
};

const BankTransferModal = ({ isOpen, onRequestClose }) => (
  <Modal
    isOpen={isOpen}
    onRequestClose={onRequestClose}
    contentLabel="Bank Transfer Modal"
    ariaHideApp={false} // Add this if you face issues with screen readers
  >
    <h2>Bank Transfer Payment</h2>
    <Elements stripe={stripePromise}>
      <PaymentForm />
    </Elements>
    <button onClick={onRequestClose}>Close</button>
  </Modal>
);

export default BankTransferModal;
