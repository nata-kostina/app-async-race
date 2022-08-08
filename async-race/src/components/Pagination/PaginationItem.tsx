import React from 'react';
import { StyledButton } from './styles';

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
    <StyledButton
      type="button"
      onClick={() => onPageChanged(value)}
      disabled={isDisabled}
      isActive={isActive}
    >
      {value}
    </StyledButton>
  );
}

export default PaginationItem;
