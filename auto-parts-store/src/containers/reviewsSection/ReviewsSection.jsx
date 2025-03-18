import React from 'react'
import './reviewsSection.css'
import Review from '../../components/review/Review'

const ReviewsSection = () => {

    const description1 = "Uniwersalny preparat wielofunkcyjny WD40 Multi-Use Spray 3 x 250ml jest najbardziej zaawansowanym środkiem smarowym w aerozolu. Bez cienia wątpliwości można";
    const descritpion2 = "Uniwersalny preparat wielofunkcyjny WD40 Multi-Use Spray 3 x 250ml jest najbardziej zaawansowanym środkiem smarowym w aerozolu. Bez cienia wątpliwości można Uniwersalny preparat wielofunkcyjny WD40 Multi-Use Spray 3 x 250ml jest najbardziej zaawansowanym środkiem smarowym w aerozolu. Bez cienia wątpliwości można";

  return (
    <div className='reviews-section'>
        <div className='reviews__title'>
            <p>Average rating</p>
            <h2>Reviews:</h2>
            <button>Leave a review</button>
        </div>
        <div className='reviews-wrapper'>
            <Review description={descritpion2}/>
            <Review description={description1}/>
            <Review description={description1}/>
            <Review description={description1}/>
            <Review description={description1}/>

        </div>
      
    </div>
  )
}

export default ReviewsSection
