import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './shop.css';
import Product from '../../components/product/Product';
import SearchBar from '../../components/searchBar/SearchBar';
import PagingManipulation from '../../components/pagingManipulation/PagingManipulation';
import CategoriesFilter from '../../components/categoriesFilter/CategoriesFilter';
import Navbar from '../../containers/navbar/Navbar';

const categoryData = {
  default: {
    image: '/src/assets/allparts.jpg',
    title: 'All Products'
  },
  1: {
    image: '/src/assets/cat1.png',
    title: 'Engines and Accessories'
  },
  2: {
    image: '/src/assets/cat2.jpg',
    title: 'Brake System'
  },
  3: {
    image: '/src/assets/cat3.avif',
    title: 'Exhaust System'
  },
  4: {
    image: '/src/assets/cat4.jpg',
    title: 'Cooling System'
  },
  5: {
    image: '/src/assets/cat5.webp',
    title: 'Automotive Electronics'
  },
  6: {
    image: '/src/assets/cat6.webp',
    title: 'Suspension and Steering System'
  },
};

const Shop = () => {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const [parts, setParts] = useState([]);
  const [pageNo, setPageNo] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState(categoryId || null);

  useEffect(() => {
    setSelectedCategory(categoryId);
    window.scrollTo(0, 0);
  }, [categoryId]);

  useEffect(() => {
    fetchParts();
    window.scrollTo(0, 0);
  }, [pageNo, pageSize, selectedCategory]);

  const fetchParts = async () => {
    try {
      const url = selectedCategory 
        ? `http://localhost:8080/api/part/category/${selectedCategory}?pageNo=${pageNo}&pageSize=${pageSize}`
        : `http://localhost:8080/api/partPageable?pageNo=${pageNo}&pageSize=${pageSize}`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch parts');
      }
      const data = await response.json();
      console.log('Fetched parts:', data);
      const partsWithCarData = await Promise.all(data.parts.map(async (part) => {
        const carResponse = await fetch(`http://localhost:8080/api/car/${part.carId}`);
        if (!carResponse.ok) {
          throw new Error('Failed to fetch car data');
        }
        const carData = await carResponse.json();
        return { ...part, car: carData };
      }));
      setParts(partsWithCarData);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error('Error fetching parts:', error);
    }
  };

  const handleCategorySelect = (categoryId) => {
    console.log(`Selected category ID: ${categoryId}`);
    setPageNo(0);
    if(categoryId === null){
      navigate('/shop');
    } else {
      navigate(`/shop/${categoryId}`);
    }
    // navigate(`/shop/${categoryId}`);
  };

  const getCategoryData = () => {
    return categoryData[selectedCategory] || categoryData['default'];
  };

  return (
    <>
      <Navbar/>
      <div className='shop'>
        <div 
          className='shop__category-header' 
          style={{ backgroundImage: `url(${getCategoryData().image})` }}
        >
          <h1>{getCategoryData().title}</h1>
        </div>
        <div className='products'>
          <SearchBar/>
          <div className='products__vertical'>
            <CategoriesFilter onCategorySelect={handleCategorySelect}/>
            <div className='products-wrapper'>
              {parts.map((part) => (
                <Product
                  key={part.id}
                  id={part.id}
                  name={part.name}
                  price={part.price}
                  car={part.car}
                  image={part.image}
                />
              ))}
            </div>
          </div>
        </div>
        <PagingManipulation totalPages={totalPages} currentPage={pageNo} setPage={setPageNo} />
      </div>
    </>
  );
};

export default Shop;


  // useEffect(() => {
  //   const handleScroll = () => {
  //     const navbarWrapper = document.querySelector('.products__navbar__wrapper');
  //     const scrollHeight = window.innerHeight / 2.3;

  //     if (window.scrollY > scrollHeight) {
  //       navbarWrapper.classList.add('fixed');
  //     } else {
  //       navbarWrapper.classList.remove('fixed');
  //     }
  //   };

  //   window.addEventListener('scroll', handleScroll);

  //   return () => {
  //     window.removeEventListener('scroll', handleScroll);
  //   };
  // }, []);