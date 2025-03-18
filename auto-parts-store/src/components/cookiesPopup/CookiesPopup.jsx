import React, { useState, useEffect } from 'react';
import './cookiesPopup.css';
import Button from '../button/Button';
import { Link } from 'react-router-dom';

const CookiesPopup = () => {
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    const cookiesAccepted = localStorage.getItem('cookiesAccepted');
    if (cookiesAccepted === 'true') {
      setIsOpen(false);
    }
  }, []);

  const handleClose = () => {
    localStorage.setItem('cookiesAccepted', 'true');
    setIsOpen(false);
  };

  const handleReject = () => {
    setIsOpen(false);
  };

  return (
    <>
      {isOpen && (
        <div className='cookies-popup'>
          <div className='cookies-popup__header'>
            <img src="src/assets/cookie.svg" alt="cookie" />
            <h2>We use cookies</h2>
          </div>
          <p>
            This website uses cookies. We use cookies to ensure that we give you the best experience on our
            website to personalise content and adverts and to analyse our traffic using Google Analytics
            <Link className='bolder' to="/rodo"> See our Terms</Link>
          </p>
          <div className='cookies-popup_buttons'>
            <Button onClick={handleClose}>Accept all</Button>
            <Button onClick={handleReject}>Reject all</Button>
          </div>
        </div>
      )}
    </>
  );
};

export default CookiesPopup;
