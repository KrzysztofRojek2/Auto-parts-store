import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import './productsSlider.css';
import 'swiper/css';
import 'swiper/css/navigation';

import { Navigation } from 'swiper/modules'; 
import SliderElement from '../sliderElement/SliderElement';

const ProductsSlider = () => {
    return (
        <>
          <Swiper
            slidesPerView={1}
            spaceBetween={20}
            cssMode={true}
            navigation={true}
            modules={[Navigation]}
            className="mySwiper1"
            breakpoints={{
              // Dla ekranów mniejszych niż 1000px
              310: {
                slidesPerView: 2,
                spaceBetween: 10
              },
              600: {
                slidesPerView: 3,
                spaceBetween: 15
              },
              950: {
                slidesPerView: 4,
                spaceBetween: 20
              },
              
            }}
          >
            <SwiperSlide><SliderElement/></SwiperSlide>
            <SwiperSlide><SliderElement/></SwiperSlide>
            <SwiperSlide><SliderElement/></SwiperSlide>
            <SwiperSlide><SliderElement/></SwiperSlide>
            <SwiperSlide><SliderElement/></SwiperSlide>
            <SwiperSlide><SliderElement/></SwiperSlide>
            <SwiperSlide><SliderElement/></SwiperSlide>
            <SwiperSlide><SliderElement/></SwiperSlide>
          </Swiper>
        </>
      )
    }

export default ProductsSlider
