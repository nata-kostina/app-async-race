import React from 'react';
import Flex from '../../Flex';
import PaginationItem from './PaginationItem';
import { StyledButton } from './styles';

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
    if (currentPage <= total - 1) {
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
    <Flex direction="row" justify="start" padding="10px 0">
      <StyledButton
        type="button"
        onClick={() => onPrevPage()}
        disabled={isDisabled}
      >
        &lt;
      </StyledButton>
      {pages }
      <StyledButton
        type="button"
        onClick={() => onNextPage()}
        disabled={isDisabled}
      >
        &gt;
      </StyledButton>
    </Flex>
  );
}

export default Pagination;
