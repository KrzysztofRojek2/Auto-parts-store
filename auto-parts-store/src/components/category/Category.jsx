import React from 'react'
import './category.css'
import { Link } from 'react-router-dom';

const Category = ({ backgroundImage, name, link }) => {
  return (
    <Link to={link}>
    <div className='category' style={{ backgroundImage }}>
      <p>{name}</p>
    </div>
    </Link>
  )
}

export default Category
