import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './cart.css'
import Navbar from '../../containers/navbar/Navbar'
import Footer from '../../containers/footer/Footer'
import Button from '../../components/button/Button'
import QuantityBox from '../../components/quantityBox/QuantityBox';
import CartItem from '../../components/cartItem/CartItem';

const Cart = () => {

    const [cartItems, setCartItems] = useState([]);
    const [transactionId, setTransactionId] = useState([]);
    const [sortedItems, setSortedItems] = useState([]);
    const [transactionPrice, setTransactionPrice] = useState(0.0);
  
    useEffect(() => {
      window.scrollTo(0, 0);
  
      // Pobierz dane koszyka z serwera i ustaw je w stanie
      const fetchCartItems = async () => {
        const userId = localStorage.getItem('userId');
        if (!userId) {
          console.error('User ID not found in localStorage');
          return;
        }
  
        try {
          const response = await fetch(`http://localhost:8080/api/transaction/ongoing/${userId}`, {
            method: 'GET',
            headers: {
            //   'Authorization': `Bearer ${localStorage.getItem('token')}`,
              'Content-Type': 'application/json'
            }
          });
  
          if (!response.ok) {
            throw new Error('Failed to fetch cart items');
          }
  
          const data = await response.json();
          const sortedItems = data.transactionParts.sort((a, b) => 
            a.partDto.name.localeCompare(b.partDto.name)
          );
          setCartItems(sortedItems);
          //setCartItems(data.transactionParts); // Zakładając, że dane zawierają transactionParts
          setTransactionId(data.id);
          setTransactionPrice(data.price);
        } catch (error) {
          console.error('Error fetching cart items:', error);
        }
      };
  
      fetchCartItems();
    }, []);

    const handleShippingClick = (e) => {
      if (cartItems.length === 0) {
        e.preventDefault();
        alert('Transaction cannot be empty');
      }
    };
    
  return (
    <>
    <Navbar/>
    <div className='cart'>
      <div className={`cart__items user-form ${cartItems.length === 0 ? 'is-empty' : ''}`}>
            <h2 className='cart__header'>Your cart</h2>
            {cartItems.length === 0 && (
              <div className="empty-cart-message">
                <h2>Your cart is empty</h2>
              </div>
            )}
            {cartItems.map((item) => (
              <CartItem key={item.partDto.id} partDto={item.partDto} transactionId={transactionId} quantity={item.quantity} />
            ))}
            </div>
        <div className='cart__transaction user-form'>
            <h2 className='cart__transaction__header'>Summary</h2>
            <div>
                <p>Wartość koszyka</p>
                <p>{transactionPrice}zł</p>
            </div>
            <div>
                <p>Dostawa od</p>
                <p>6.99zł</p>
            </div>
            <div className='cart__price-sum'>
                <p>Razem z dostawą</p>
                <p>{(transactionPrice + 6.99).toFixed(2)}zł</p>
            </div>
            <Link to="/shipping" onClick={handleShippingClick} className={cartItems.length === 0 ? 'link-disabled' : ''}>
              <Button className={cartItems.length === 0 ? 'disabled' : ''}>Wybierz sposób dostawy</Button>
            </Link>
        </div>

        </div>
    <Footer/>
    </>
    
  )
}

export default Cart
