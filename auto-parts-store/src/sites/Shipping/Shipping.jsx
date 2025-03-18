import React, { useEffect, useState } from 'react'
import './shipping.css'
import Navbar from '../../containers/navbar/Navbar'
import Footer from '../../containers/footer/Footer'
import Button from '../../components/button/Button'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


const Shipping = () => {
  const [shippingOptions, setShippingOptions] = useState([]);
  const [selectedShipping, setSelectedShipping] = useState(null);
  const [loading, setLoading] = useState(false);
  const [hasShipping, setHasShipping] = useState(false);
  const [shippingDetails, setShippingDetails] = useState({ name: 'No ', price: 0.00 });
  const [cartPrice, setCartPrice] = useState(0.00);
  const transactionId = localStorage.getItem('cartId');
  const userId = localStorage.getItem('userId');
  const navigate = useNavigate();

  const [userInfo, setUserInfo] = useState({
    firstName: 'no info: First Name',
    lastName: 'no info: Last Name',
    phone: 'no info: Phone Number'
  });
  const [addressInfo, setAddressInfo] = useState({
    country: 'no info: Country',
    postalCode: 'no info: Postal Code',
    street: 'no info: Street',
    city: 'no info: City',
    state: 'no info: State',
    apartmentNumber: 'no info: Apartment Number'
  });

  useEffect(() => {
    window.scrollTo(0, 0);

    const fetchShippingOptions = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/shipping', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        });
        
        if (!response.ok) {
          throw new Error('Failed to fetch items');
        }
        const data = await response.json();
        setShippingOptions(data);

      }catch (error) {
        console.error('Error fetching cart items:', error);
      }
    };

    const fetchUserInfo = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/user/${userId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch user info');
        }

        const data = await response.json();
        setUserInfo(data);
      } catch (error) {
        console.error('Error fetching user info:', error);
      }
    };

    const fetchAddressInfo = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/user/${userId}/address`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch address info');
        }

        const data = await response.json();
        setAddressInfo(data);
      } catch (error) {
        console.error('Error fetching address info:', error);
      }
    };

    const fetchCartPrice = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/transaction/${transactionId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch cart price');
        }

        const data = await response.json();
        setCartPrice(data.price);
      } catch (error) {
        console.error('Error fetching cart price:', error);
      }
    };

    fetchUserInfo();
    fetchAddressInfo();
    fetchShippingOptions();
    fetchCartPrice();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!selectedShipping) {
      console.error('No shipping option selected');
      return;
    }

    const shippingId = selectedShipping.id;

    try {
      const response = await fetch(`http://localhost:8080/api/transaction/${transactionId}/shipping/${shippingId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to set shipping option');
      }

      console.log('Shipping option set successfully');
      setShippingDetails({ name: selectedShipping.name, price: selectedShipping.price });
      setHasShipping(true);
      alert("Shipping option set successfully");
    } catch (error) {
      console.error('Error setting shipping option:', error);
    }
  };

  const handlePayment = async () => {
    setLoading(true);

    try {
      await fetch(`http://localhost:8080/api/transaction/${transactionId}/status/PAID`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      try {
        const transactionResponse = await fetch(`http://localhost:8080/api/transaction/create/${userId}`, {
         method: 'POST'
       });
 
       if (!transactionResponse.ok) {
         const errorData = await transactionResponse.json();
         throw new Error(errorData.message || 'Failed to create transaction');
       }
       
       const transactionData = await transactionResponse.json();
   
       localStorage.setItem('cartId', transactionData.id);
       
     } catch (error) {
       console.error('Error setting shipping option:', error);
     }

      // alert('Płatność udana');
      navigate('/payment');

    } catch (error) {
      console.error('Error processing payment:', error);
      setLoading(false);
    }
  };


  const handleShippingChange = (event) => {
    const selectedShippingId = parseInt(event.target.value);
    const selectedShippingOption = shippingOptions.find(option => option.id === selectedShippingId);
    setSelectedShipping(selectedShippingOption);
  };

  return (
    <>
    <Navbar/>
    <div className='shipping'>
      <div className='shipping__settings'>
        <div className='shipping__shipment-options user-form'>
        <h2>Select Your Delivery Option</h2>
        <form class="delivery-form" onSubmit={handleSubmit}>
        {shippingOptions.map((option) => (
                <div key={option.id} className="radio-group">
                  <div className='radio-group__left'>
                    <input 
                      type="radio" 
                      id={`delivery${option.id}`} 
                      name="delivery" 
                      value={option.id} 
                      onChange={handleShippingChange} 
                    />
                    <label htmlFor={`delivery${option.id}`}>{option.name}</label>
                  </div>
                  <p>{option.price}zł</p>
                </div>
              ))}
          <input class="submit-btn" type="submit" value="Submit" />
        </form>
        </div>
        <div className='shipping__user-info user-form'>
         <h2>Buyer information</h2>

         <div className='user_info__wrapper'>
          <div>
            <div className='user-info__inner'>
              <p>John</p>
              <p>Doe</p>
              <p>012-244-976</p>
            </div>
            <Link to="/user-panel"><p className='user-info__modify'>Modify</p></Link>
          </div>

          <div>
            <div className='user-info__inner'>
              <p style={{ color: addressInfo.country === 'no info: Country' ? 'red' : 'inherit' }}>{addressInfo.country}</p>
              <p style={{ color: addressInfo.postalCode === 'no info: Postal Code' ? 'red' : 'inherit' }}>{addressInfo.postalCode}</p>
              <p style={{ color: addressInfo.street === 'no info: Street' ? 'red' : 'inherit' }}>{addressInfo.street}</p>
              <p style={{ color: addressInfo.city === 'no info: City' ? 'red' : 'inherit' }}>{addressInfo.city}</p>
              <p style={{ color: addressInfo.state === 'no info: State' ? 'red' : 'inherit' }}>{addressInfo.state}</p>
              <p style={{ color: addressInfo.apartmentNumber === 'no info: Apartment Number' ? 'red' : 'inherit' }}>{addressInfo.apartmentNumber}</p>
            </div>

            <Link to="/user-panel"><p className='user-info__modify'>Modify</p></Link>
          </div>
         </div>
        </div>
      </div>
      <div className='shipping__summary user-form'>
        <h2 className='shipping__summary__header'>Summary</h2>
            <div>
              <p>Wartość koszyka</p>
              <p>{cartPrice.toFixed(2)}zł</p>
            </div>
            <div>
                <p>{shippingDetails.name} shipping</p>
                <p>{shippingDetails.price.toFixed(2)}zł</p>
            </div>
            <div className='shipping__summary-sum'>
              <p>Razem z dostawą</p>
              <p>{(cartPrice + shippingDetails.price).toFixed(2)}zł</p>
            </div>
            <Button onClick={handlePayment} disabled={!hasShipping || loading} className={!hasShipping ? 'disabled' : ''}>
              {loading ? 'Przetwarzanie płatności...' : 'Przejdź do płatności'}
            </Button>
      </div>
    </div>
    <Footer/>
    </>
  )
}

export default Shipping
