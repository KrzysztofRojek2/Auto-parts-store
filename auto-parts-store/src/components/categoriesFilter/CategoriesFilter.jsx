import React, { useEffect, useState } from 'react';
import './categoriesFilter.css';

const CategoriesFilter = ({ onCategorySelect }) => {
  const [categories, setCategories] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/category');
      if (!response.ok) {
        throw new Error('Failed to fetch categories');
      }
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleCategoryClick = (categoryId) => {
    setSelectedCategoryId(categoryId);
    onCategorySelect(categoryId);
  };

  return (
    <div className='categories-filter'>
      <div className='categories-filter__wrapper'>
        <div
          className={`categories-filter__element ${selectedCategoryId === null ? 'chosen' : ''}`}
          onClick={() => handleCategoryClick(null)}
        >
          <p>All</p>
          <div className='arrow-left'></div>
        </div>
        {categories.map((category) => (
          <div
            key={category.id}
            className={`categories-filter__element ${selectedCategoryId === category.id ? 'chosen' : ''}`}
            onClick={() => handleCategoryClick(category.id)}
          >
            <p>{category.name}</p>
            <div className='arrow-left'></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoriesFilter;
