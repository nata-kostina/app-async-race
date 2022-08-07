import React, { useContext } from 'react';
import { StyledLink, StyledNavigation } from './styles';
import { NavigationProps } from '../../types/types';
import { StateContext } from '../../state/State';

function Navigation({ theme }: NavigationProps) {
  const { state } = useContext(StateContext);
  const onLinkClicked = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    if (state.isRaceStarted) {
      e.preventDefault();
    }
  };
  return (
    <StyledNavigation theme={theme}>
      <StyledLink to="/garage" onClick={onLinkClicked} theme={theme}>Garage</StyledLink>
      <StyledLink to="/winners" onClick={onLinkClicked} theme={theme}>Winners</StyledLink>
    </StyledNavigation>
  );
}

export default Navigation;
