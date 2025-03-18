import React from 'react'
import ProductsSlider from '../../components/productsSlider/ProductsSlider'

import './recommendedSlider.css'

const RecommendedSlider = () => {
  return (
    <div className='recommended-slider'>
        <h2>Chosen for you</h2>
      <ProductsSlider/>
    </div>
  )
}

export default RecommendedSlider
