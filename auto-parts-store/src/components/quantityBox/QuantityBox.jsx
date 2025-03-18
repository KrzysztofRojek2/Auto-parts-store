import React from 'react';
import './quantityBox.css';
import { useNavigate } from 'react-router-dom';

const QuantityBox = ({ quantity, transactionId, partId }) => {
  const navigate = useNavigate();
  const handleDecrease = () => {
    // Wywołaj funkcję, która zmniejszy ilość produktu w koszyku na serwerze
    fetch(`http://localhost:8080/api/transaction/${transactionId}/parts/${partId}/decrease`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        transactionId: transactionId,
        partId: partId
      })
    })
    .then(response => response.json())
    .then(data => {
      window.location.reload()
    })
    .catch(error => console.error('Error decreasing quantity:', error));
  };

  const handleIncrease = () => {
    // Wywołaj funkcję, która zwiększy ilość produktu w koszyku na serwerze
    fetch(`http://localhost:8080/api/transaction/${transactionId}/parts/${partId}/increase`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        transactionId: transactionId,
        partId: partId
      })
    })
    .then(response => response.json())
    .then(data => {
      // Tutaj możesz zaktualizować stan komponentu na podstawie odpowiedzi z serwera, np. ustawiając nową ilość produktu
      window.location.reload()
    })
    .catch(error => console.error('Error increasing quantity:', error));
  };

  return (
    <div className='quantity-box'>
      <div className='quantity-minus' onClick={handleDecrease}>
        <p>-</p>
      </div>
      <div className='quantity-num'>
        <p>{quantity}</p>
      </div>
      <div className='quantity-plus' onClick={handleIncrease}>
        <p>+</p>
      </div>
    </div>
  );
};

export default QuantityBox;