import React from 'react';
import './finalizedTransaction.css';
import FinalizedTransactionItem from '../finalizedTransactionItem/FinalizedTransactionItem';

const FinalizedTransaction = ({ transaction }) => {
  return (
    <div className='finalized-transaction user-form'>
        <div className='transaction__meta-info meta-info'>
          <p>Transaction id: {transaction.id}</p>
          <p>Date: {new Date(transaction.date).toLocaleDateString()}</p>
        </div>
        <div className='transaction__product-info'>
          <p>Bought products</p>
          <p>Number of items</p>
          <p>Price</p>
        </div>
        {transaction.transactionParts.map((part, index) => (
          <FinalizedTransactionItem key={index} part={part} />
        ))}
        <p className='transaction__full-price meta-info'>Full price: {transaction.price.toFixed(2)}zł</p>
      </div>
  );
}

export default FinalizedTransaction;