import React from 'react'
import './blog.css'

const Blog = ({blogImg}) => {
  return (
    <div className='blog'>
      <div className='blog__img'>
        <img src={blogImg} alt="blog-img" />
      </div>
      <div className='blog__text'>
        <h2>Blog title</h2>
        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.</p>
      </div>
    </div>
  )
}

export default Blog
