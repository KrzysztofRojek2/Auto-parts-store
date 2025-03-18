import React, { useEffect } from 'react'
import Navbar from '../../containers/navbar/Navbar';
import Header from '../../containers/header/Header'
import CategoriesWrapper from '../../containers/categoriesWrapper/CategoriesWrapper'
import BlogsWrapper from '../../containers/blogsWrapper/BlogsWrapper'
import Footer from '../../containers/footer/Footer'
import Product from '../../components/product/Product';
import Advert from '../../components/advert/Advert';
import RecommendedSlider from '../../containers/recommendedSlider/RecommendedSlider';
import CookiesPopup from '../../components/cookiesPopup/CookiesPopup';

const Home = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
        <Navbar/>
        <Header/>
        <CookiesPopup/>
        {/* <RecommendedSlider/> */}
        <Advert imageUrl={"src/assets/acura.jpg"} text={"CHECK OUT NEW MODELS"}/>
        <CategoriesWrapper/>
        <Advert imageUrl={"src/assets/interior.jpg"} text={"BROWSE ACCESSORIES"}/>
        {/* <BlogsWrapper/> */}
        {/* <RecommendedSlider/> */}
        <Footer />

        {/* <Footer/> */}
    </>
  )
}

export default Home
