import React from 'react'
import './cartItem.css'
import QuantityBox from '../quantityBox/QuantityBox'

const CartItem = ({ quantity, partDto, transactionId }) => {
    const { name, price } = partDto;
  
    return (
      <div className='cart-item'>
        <div className='cart-item__left'>
          <img src={partDto.image} alt="" />
          <p>{name}</p>
        </div>
        <div className='cart-item__right'>
          <QuantityBox quantity={quantity} transactionId={transactionId} partId={partDto.id} />
          <p className='cart-item__price'>{price} PLN</p>
        </div>
      </div>
    );
  };
  
  export default CartItem;
  

// <img src="src/assets/part2.jpg" alt="" />
