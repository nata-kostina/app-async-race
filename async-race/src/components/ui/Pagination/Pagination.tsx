import React from 'react';
import PaginationItem from './PaginationItem';

interface PaginationProps {
  total: number,
  currentPage: number,
  onPageChanged: (value: number) => void
}

function Pagination({ total, currentPage, onPageChanged }: PaginationProps) {
  const pages = [];

  const onPrevPage = () => {
    if (currentPage !== 1) {
      onPageChanged(currentPage - 1);
    }
  };
  const onNextPage = () => {
    if (currentPage !== total) {
      onPageChanged(currentPage + 1);
    }
  };
  for (let i = 1; i <= total; i += 1) {
    pages.push(<PaginationItem
      value={i}
      isActive={i === currentPage}
      onPageChanged={onPageChanged}
      key={i}
    />);
  }

  return (
    <div className="pagination">
      Pagination
      <button
        type="button"
        onClick={() => onPrevPage()}
      >
        Prev
      </button>
      {pages}
      <button
        type="button"
        onClick={() => onNextPage()}
      >
        Next

      </button>
    </div>
  );
}

export default Pagination;
