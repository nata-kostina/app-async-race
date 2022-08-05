import React from 'react';
import { StyledLink, StyledNavigation } from './styles';
import { NavigationProps } from '../../types/types';

function Navigation({ theme }: NavigationProps) {
  const onWinnersLinkClicked = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    console.log(e);
    // if (state.isRacing) {
    //   e.preventDefault();
    //   setShowModal(true);
    // }
  };
  return (
    <StyledNavigation theme={theme}>
      <StyledLink to="/garage" theme={theme}>Garage</StyledLink>
      <StyledLink to="/winners" onClick={(e) => onWinnersLinkClicked(e)} theme={theme}>Winners</StyledLink>
    </StyledNavigation>
  );
}

export default Navigation;
