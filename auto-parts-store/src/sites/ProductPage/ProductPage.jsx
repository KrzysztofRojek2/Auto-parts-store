import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './productPage.css';
import Navbar from '../../containers/navbar/Navbar';
import Footer from '../../containers/footer/Footer';
import ReviewsSection from '../../containers/reviewsSection/ReviewsSection';
import Button from '../../components/button/Button';

const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [car, setCar] = useState(null);

  useEffect(() => {
    const fetchProductAndCar = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/part/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch product data');
        }
        const productData = await response.json();
        setProduct(productData);

        const carResponse = await fetch(`http://localhost:8080/api/car/${productData.carId}`);
        if (!carResponse.ok) {
          throw new Error('Failed to fetch car data');
        }
        const carData = await carResponse.json();
        setCar(carData);
      } catch (error) {
        console.error('Error fetching product or car data:', error);
      }
    };

    fetchProductAndCar();
    window.scrollTo(0, 0);
  }, [id]);

  const addProductToCart = async () => {
    const cartId = localStorage.getItem('cartId');

    if (!cartId) {
      console.error('No cart ID found in localStorage');
      return;
    }

    try {
      const response = await fetch(`http://localhost:8080/api/transaction/${cartId}/parts/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
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

  if (!product || !car) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Navbar />
      <div className='product-page section-padding'>
        <div className='product-page__header'>
          <div className='product-page__img'>
            <img src={product.image || "/src/assets/wd40.jpg"} alt={product.name} />
          </div>
          <div className='product-page__info'>
            <p className='product-page__name'>{product.name}</p>
            <p className='product__page__car'>{car.name}</p>
            <div className='product-page__price'>
              <p className='price-after'>{product.price}zł</p>
            </div>
            <div className='product-page__buttons'>
              <Button onClick={addProductToCart}>Dodaj do koszyka</Button>
            </div>
          </div>
        </div>
        <div className='product-page__details'>
          <div className='product-page__description'>
            <p>{product.description}</p>
          </div>
          {/* <ReviewsSection /> */}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProductPage;
