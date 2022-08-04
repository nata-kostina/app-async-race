import React from 'react';
import PaginationItem from './PaginationItem';

interface PaginationProps {
  total: number,
  currentPage: number,
  onPageChanged: (value: number) => void,
  isDisabled: boolean,
}

function Pagination({
  total, currentPage, onPageChanged, isDisabled,
}: PaginationProps) {
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
      isDisabled={isDisabled}
    />);
  }

  return (
    <div className="pagination">
      Pagination
      <button
        type="button"
        onClick={() => onPrevPage()}
        disabled={isDisabled}
      >
        Prev
      </button>
      {pages }
      <button
        type="button"
        onClick={() => onNextPage()}
        disabled={isDisabled}
      >
        Next

      </button>
    </div>
  );
}

export default Pagination;
