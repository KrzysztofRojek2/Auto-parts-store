import React from 'react'
import './categoriesWrapper.css'
import Category from '../../components/category/Category';
import { Link } from 'react-router-dom';

const CategoriesWrapper = () => {
  const backgroundImage1 = "url('src/assets/cat1.png')";
  const backgroundImage2 = "url('src/assets/cat2.jpg')";
  const backgroundImage3 = "url('src/assets/cat3.avif')";
  const backgroundImage4 = "url('src/assets/cat4.jpg')";
  const backgroundImage5 = "url('src/assets/cat5.webp')";
  const backgroundImage6 = "url('src/assets/cat6.webp')";
  const backgroundImage7 = "url('src/assets/allparts.jpg')";
  const categoryName1 = "Engines and Accessories";
  const categoryName2 = "Brake System";
  const categoryName3 = "Exhaust System";
  const categoryName4 = "Cooling System";
  const categoryName5 = "Automotive Electronics";
  const categoryName6 = "Suspension and Steering System";
  const link1 = "/shop";
  const link2 = "/shop/1";
  const link3 = "/shop/2";
  const link4 = "/shop/3";
  const link5 = "/shop/4";
  const link6 = "/shop/5";
  const link7 = "/shop/6";

  return (
    <div className='categories-wrapper section-padding'>
      <div className='first-category'>
        <Category className="first-category" name={"All"} backgroundImage={backgroundImage7} link={link1}/>
      </div>
      <div className='categories-grid'>
        <Category name={categoryName1} backgroundImage={backgroundImage1} link={link2}/>
        <Category name={categoryName2} backgroundImage={backgroundImage2} link={link3}/>
        <Category name={categoryName3} backgroundImage={backgroundImage3} link={link4}/>
        <Category name={categoryName4} backgroundImage={backgroundImage4} link={link5}/>
        <Category name={categoryName5} backgroundImage={backgroundImage5} link={link6}/>
        <Category name={categoryName6} backgroundImage={backgroundImage6} link={link7}/>
      </div>
      
    </div>
  )
}

export default CategoriesWrapper
