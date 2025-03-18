import React from 'react';
import './pagingManipulation.css';

const PagingManipulation = ({ currentPage, totalPages, setPage }) => {
  const goToPrevPage = () => {
    if (currentPage >= 1) {
      setPage(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    if (currentPage < totalPages-1) {
      setPage(currentPage + 1);
    }
  };

  return (
    <div className='paging-manipulation'>
      <div className='empty-space'></div>
      <div className='paging__current-page'>
        <p className='prev-element' onClick={goToPrevPage}>{'<<'}</p>
        <p className='prev-element' onClick={goToPrevPage}>{'<'}</p>
        <p>{currentPage + 1}</p>
        <p>z</p>
        <p>{totalPages}</p>
        <p className='next-element' onClick={goToNextPage}>{'>'}</p>
        <p className='next-element' onClick={goToNextPage}>{'>>'}</p>

      </div>
      <div className='paging__no-of-pages'>
        <p>Pokaż:</p>
        <p>50</p>
      </div>
    </div>
  );
};

export default PagingManipulation;