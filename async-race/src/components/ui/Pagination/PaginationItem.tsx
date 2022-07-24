import React from 'react';

interface PaginationItemProps {
  value: number,
  isActive: boolean,
  onPageChanged: (value: number) => void
}
function PaginationItem({ value, isActive, onPageChanged }: PaginationItemProps) {
  return (
    <button type="button" className={`pagination__item ${isActive ? 'active' : ''}`} onClick={() => onPageChanged(value)}>
      {value}
    </button>
  );
}

export default PaginationItem;
