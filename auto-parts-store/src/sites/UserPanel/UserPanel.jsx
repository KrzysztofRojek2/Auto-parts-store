import React, { useState, useEffect } from 'react';
import './userPanel.css'
import Navbar from '../../containers/navbar/Navbar'
import Footer from '../../containers/footer/Footer'
import FinalizedTransaction from '../../components/finalizedTransaction/FinalizedTransaction';

const UserPanel = () => {

  const userId = localStorage.getItem('userId');
  const [transactions, setTransactions] = useState([]);


  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    phone: ''
  });

  const [address, setAddress] = useState({
    country: '',
    postalCode: '',
    street: '',
    city: '',
    state: '',
    apartmentNumber: ''
  });

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchUserData();
    fetchAddressData();
    fetchPassedTransactions();
  }, []);

  const fetchUserData = async () => {
    try {
      console.log(userId);
      const response = await fetch(`http://localhost:8080/api/user/${userId}`, {
        method: 'GET',
        headers: {
          // 'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        }
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setUser(data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchAddressData = async () => {
    try {
      // const userId = localStorage.getItem('userId');
      const response = await fetch(`http://localhost:8080/api/user/${userId}/address`, {
        method: 'GET',
        headers: {
          // 'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        }
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setAddress(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleUserUpdate = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/user/update/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      console.log('User updated successfully');
    } catch (error) {
      console.error('Error updating user data:', error);
    }
  };

  const handleAddressUpdate = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/address/update/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(address)
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      console.log('Address updated successfully');
    } catch (error) {
      console.error('Error updating address data:', error);
    }
  };


  const fetchPassedTransactions = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/transaction/passed/${userId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setTransactions(data.reverse());
    } catch (error) {
      console.error(error);
    }
  };


  const handleInputChange = (event, setState) => {
    const { name, value } = event.target;
    setState(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  return (
    <>
    <Navbar/>
    <div className='user-panel'>
        <div className='user-panel__info'>
        <form className='user-panel__account user-form' onSubmit={handleAddressUpdate}>
    <h3>Your address information</h3>
    <p>Change data and click update to modify your address information</p>
    <div className='user-panel__input-section'>
        <div className='form-group'>
            <label htmlFor="country">Country</label>
            <input type="text" id="country" name="country" placeholder="POLAND" value={address.country} onChange={(e) => handleInputChange(e, setAddress)} />
        </div>
        <div className='form-group'>
            <label htmlFor="postalCode">Postcode</label>
            <input type="text" id="postalCode" name="postalCode" placeholder="00-001" value={address.postalCode} onChange={(e) => handleInputChange(e, setAddress)} />
        </div>
        <div className='form-group'>
            <label htmlFor="street">Street</label>
            <input type="text" id="street" name="street" placeholder="MAIN STREET" value={address.street} onChange={(e) => handleInputChange(e, setAddress)} />
        </div>
        <div className='form-group'>
            <label htmlFor="city">City</label>
            <input type="text" id="city" name="city" placeholder="WARSAW" value={address.city} onChange={(e) => handleInputChange(e, setAddress)} />
        </div>
        <div className='form-group'>
            <label htmlFor="state">State/County</label>
            <input type="text" id="state" name="state" placeholder="MAZOVIA" value={address.state} onChange={(e) => handleInputChange(e, setAddress)} />
        </div>
        <div className='form-group'>
            <label htmlFor="apartmentNumber">Building number</label>
            <input type="text" id="apartmentNumber" name="apartmentNumber" placeholder="123" value={address.apartmentNumber} onChange={(e) => handleInputChange(e, setAddress)} />
        </div>
    </div>
    <input className='submit-btn' type="submit" value="Update"/>
</form>

<form className='user-panel__address user-form' onSubmit={handleUserUpdate}>
    <h3>Your personal information</h3>
    <p>Change data and click update to modify your personal information</p>
    <div className='user-panel__input-section'>
        <div className='form-group'>
            <label htmlFor="firstName">First name</label>
            <input type="text" id="firstName" name="firstName" placeholder="JOHN" value={user.firstName} onChange={(e) => handleInputChange(e, setUser)} />
        </div>
        <div className='form-group'>
            <label htmlFor="lastName">Last name</label>
            <input type="text" id="lastName" name="lastName" placeholder="DOE" value={user.lastName} onChange={(e) => handleInputChange(e, setUser)} />
        </div>
        <div className='form-group'>
            <label htmlFor="phone">Phone number</label>
            <input type="text" id="phoneNumber" name="phoneNumber" placeholder="123-456-7890" value={user.phoneNumber} onChange={(e) => handleInputChange(e, setUser)} />
        </div>
    </div>
    <input className='submit-btn' type="submit" value="Update"/>
</form>


        </div>

        <div className='user-panel__transactions-wrapper'>
          <h2 className='user-panel__transactions-header'>HISTORY OF TRANSACTIONS</h2>
          {transactions.map(transaction => (
            <FinalizedTransaction key={transaction.id} transaction={transaction} />
          ))}
        </div>
    </div>
    <Footer/>
    </>
  )
}

export default UserPanel
