import React from 'react'
import './review.css'

const Review = ({description}) => {
  return (
    <div className='review'>
        <div className='review__top'>
            <div className='review__left'>
                <p>* * * * *</p>
                <p>Imie Nazwisko</p>
            </div>
            <div className='review__right'>
                <p>24 October, 2024</p>
            </div>
        </div>
        <p className='review__title'>Tytuł</p>
      <p>{description}</p>
    </div>
  )
}

export default Review
