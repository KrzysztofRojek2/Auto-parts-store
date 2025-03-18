import React from 'react';
import './footer.css';
import FooterSection from '../../components/footerSection/FooterSection';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faFacebook, faTwitter, faLinkedin, faYoutube, faPinterest, faTumblr } from '@fortawesome/free-brands-svg-icons';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';

const Footer = () => {
  const containerStyle = {
    width: '400px',
    height: '400px'
  };

  const center = {
    lat: 51.5074,
    lng: -0.1278
  };

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: 'AIzaSyCQ_MWgfTCW2rBgzvexvL4iuDNKmtqQ72Q'
  });

  const [map, setMap] = React.useState(null);

  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);
    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  return (
    <footer className='footer'>
      <div className='footer__top'>
        <div className='footer__newsletter'>
          <div className='footer__icons'>
            <FontAwesomeIcon icon={faInstagram} className='footer-faicon' size="2x" />
            <FontAwesomeIcon icon={faFacebook} className='footer-faicon' size="2x" />
            <FontAwesomeIcon icon={faTwitter} className='footer-faicon' size="2x" />
            <FontAwesomeIcon icon={faLinkedin} className='footer-faicon' size="2x" />
            <FontAwesomeIcon icon={faYoutube} className='footer-faicon' size="2x" />
            <FontAwesomeIcon icon={faPinterest} className='footer-faicon' size="2x" />
            <FontAwesomeIcon icon={faTumblr} className='footer-faicon' size="2x" />
          </div>
          <h2>Don't Miss Out</h2>
          
          {isLoaded ? (
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={center}
              zoom={10}
              onLoad={onLoad}
              onUnmount={onUnmount}
            >
              <Marker position={center} />
            </GoogleMap>
          ) : <></>}
        </div>

        <div className='footer__info'>
          <FooterSection title="COMPANY" items={["About", "Experts and Spokesmodels"]} />
          <FooterSection title="CUSTOMER SERVICE" items={["Contact Us", "My Account", "Store Locator", "Redeem Rewards"]} />
          <FooterSection title="MORE TO EXPLORE" items={["Car Magazine", "Tools and Consultations", "Offers"]} />
        </div>
      </div>
      <div className='footer__middle'>
        <div className='footer__additional_info'>
          <p>SITE MAP</p>
          <p>PRIVACY</p>
          <p>TERMS</p>
          <p>PERMISSION TERMS</p>
        </div>
        <div className='footer__rigths-reserved'>
          <p>Copyright © AutoCar</p>
        </div>
      </div>
      <div className='footer__bottom'>
        <p>This site is intended for EU consumers. By signing up, you understand and agree that your data will be collected and used subject to our EU Privacy Policy and Terms of Use</p>
      </div>
    </footer>
  );
}

export default Footer;
