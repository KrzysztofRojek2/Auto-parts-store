import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useNavigate } from 'react-router-dom';
import './checkoutForm.css';

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const cardElement = elements.getElement(CardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
      billing_details: {
        // Optional billing details
        address: {
          postal_code: '12345',
        },
      },
    });

    if (error) {
      setError(error.message);
    } else {
      setError(null);

      const { id } = paymentMethod;

      try {
        const response = await fetch('http://localhost:5000/api/payment', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id, amount: 1000 }), // amount in cents
        });

        const data = await response.json();

        if (data.success) {
          alert('Płatność udana');
          navigate('/user-panel');
          // setSuccess('Payment successful!');
        } else {
          setError('Payment failed. Please try again.');
        }
      } catch (error) {
        setError('Payment failed. Please try again.');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="checkout-form">
      <h2>Payment Details</h2>
      <div className="card-element">
        <CardElement />
      </div>
      <button type="submit" disabled={!stripe}>Pay</button>
      {error && <div className="error">{error}</div>}
      {success && <div className="success">{success}</div>}
    </form>
  );
};

export default CheckoutForm;
