import React from 'react';

interface PaginationItemProps {
  value: number,
  isActive: boolean,
  onPageChanged: (value: number) => void,
  isDisabled: boolean,
}
function PaginationItem({
  value, isActive, onPageChanged, isDisabled,
}: PaginationItemProps) {
  return (
    <button
      type="button"
      className={`pagination__item ${isActive ? 'active' : ''}`}
      onClick={() => onPageChanged(value)}
      disabled={isDisabled}
    >
      {value}
    </button>
  );
}

export default PaginationItem;
