import React from 'react'
import './blogsWrapper.css'
import Blog from '../../components/blog/Blog'

const BlogsWrapper = () => {
  return (
    <div className='blogs-wrapper section-padding'>
      <Blog blogImg={'src/assets/blog1.jpg'}/>
      <Blog blogImg={'src/assets/blog2.webp'}/>
    </div>
  )
}

export default BlogsWrapper
