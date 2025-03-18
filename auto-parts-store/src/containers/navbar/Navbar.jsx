import React from 'react';
import { Link } from 'react-router-dom';
import './navbar.css';
import Button from '../../components/button/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faCartShopping } from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
  // Sprawdź, czy token istnieje w localStorage
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    // Usuń token z localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('cartId');
    localStorage.removeItem('email');
    localStorage.removeItem('role');
    localStorage.removeItem('userId');
    window.location.reload();
  };
  return (
    <nav className='navbar'>
      <img src="/src/assets/car-logo-vector-24406077.jpg" alt="logo" className='website-logo' />

      <div className='navbar__options'>
        <div className='navbar__text'>
          {/* <Link to="/admin-home"><p>Admin Panel</p></Link> */}
          <Link to="/"><p>HOME</p></Link>
          <Link to="/shop"><p>SHOP</p></Link>
          {/* <p>DEALS</p>
          <p>ACCESSORIES</p>
          <p>CARS</p> */}
          <Link to="/About"><p>ABOUT</p></Link>
          {token && <Link to="/cart"><FontAwesomeIcon icon={faCartShopping} /></Link>}
          {token && <Link to="/user-panel"><FontAwesomeIcon icon={faUser} /></Link>}
        </div>
        
        <div className='navbar__buttons'>
          {/* Wyświetl przyciski logowania i rejestracji tylko jeśli użytkownik nie jest zalogowany */}
          {!token && <Link to="/login"><Button>LOGIN</Button></Link>}
          {!token && <Link to="/register"><Button>REGISTER</Button></Link>}
          {token && <Button onClick={handleLogout}>LOGOUT</Button>}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
