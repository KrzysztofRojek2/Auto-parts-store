import React from 'react'
import './advert.css'



const Advert = ({ imageUrl, text }) => {
    const advertImage = "url('src/assets/cat2.jpg')";

  return (
    <div className='advert'>
        <div className='advert__img'>
            <img src={imageUrl} alt="image" />
        </div>
        <div className="advert__content">
            <p>{text}</p>
        </div>
      
    </div>
  )
}

export default Advert
