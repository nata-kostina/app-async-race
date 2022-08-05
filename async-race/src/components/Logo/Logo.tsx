import React from 'react';
import Background from '../../assets/images/background-logo.png';
import { ThemeProps } from '../../types/types';
import { StyledImg, StyledLogo, TextOverlay } from './styles';

function Logo({ theme }: ThemeProps) {
  return (
    <StyledLogo theme={theme}>
      <StyledImg src={Background} alt="background" theme={theme} />
      <TextOverlay theme={theme}>
        <h1>
          {' '}
          Real Drive
        </h1>
      </TextOverlay>
    </StyledLogo>
  );
}

export default Logo;
