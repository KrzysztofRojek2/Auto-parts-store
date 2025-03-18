import React from 'react';
import './finalizedTransactionItem.css';

const FinalizedTransactionItem = ({ part }) => {
  return (
    <div className='finalized-transaction__item'>
        <div className='finalized-transaction__item__name-img'>
            <img src={part.partDto.image} alt={part.partDto.name} />
            <p>{part.partDto.name}</p>
        </div>
        <p className='transaction__item__full-price'>{part.quantity} x {part.partDto.price.toFixed(2)}zł</p>
        <p>{(part.quantity * part.partDto.price).toFixed(2)}zł</p>
    </div>
  );
}

export default FinalizedTransactionItem;