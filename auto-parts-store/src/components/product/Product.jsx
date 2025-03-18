import React from 'react';
import './product.css';
import Button from '../button/Button';
import { useNavigate } from 'react-router-dom';

const Product = ({ id, name, price, car, image }) => {
  const navigate = useNavigate();

  const addProductToCart = async (partId) => {
    const cartId = localStorage.getItem('cartId');
    const token = localStorage.getItem('token');
  
    if (!cartId || !token) {
      alert('Musisz być zalogowany, aby dodać produkt do koszyka.');
      return;
    }
  
    try {
      const response = await fetch(`http://localhost:8080/api/transaction/${cartId}/parts/${partId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
  
      if (!response.ok) {
        throw new Error('Failed to add part to cart');
      }
  
      console.log('Part added to cart successfully');
      alert('Produkt został dodany do koszyka!');
    } catch (error) {
      console.error('Error adding part to cart:', error);
      alert('Wystąpił błąd podczas dodawania produktu do koszyka.');
    }
  };
  

  const handleImageClick = () => {
    navigate(`/product/${id}`);
  };

  return (
    <div className='product'>
      <div className='product__img' onClick={handleImageClick}>
        <img src={image} alt="Produkt" />
      </div>
      <p className='product__manufacturer'>{car.name}</p>
      <h3 className='product__name'>{name}</h3>
      <p className='product__price'>{price} PLN</p>
      <Button onClick={() => addProductToCart(id)}>Dodaj do koszyka</Button>
    </div>
  );
};

export default Product;
