import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import DINBold from '../assets/fonts/DIN-Bold.ttf';
import DINRegular from '../assets/fonts/DIN-Regular.ttf';
import { FlexProps } from '../types/types';

export const GlobalStyle = createGlobalStyle`
@font-face {
  font-family: DINBold;
  src: url(${DINBold}) format('truetype');
}

@font-face {
  font-family: DINRegular;
  src: url(${DINRegular}) format('truetype');
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
body {
  margin: 0;
}
`;

export const StyledFlex = styled.div<FlexProps>`
display: flex;
flex-direction: ${({ direction }) => direction || 'column'};
align-items: ${({ align }) => align || 'stretch'};
justify-content: ${({ justify }) => justify || 'center'};
height: ${({ height }) => height || '100%'};
margin: ${({ margin }) => margin || '0'};
padding: ${({ padding }) => padding || '0'};
`;

export function Flex({ children, ...props }: FlexProps) {
  return (
    <StyledFlex {...props}>
      {children}
    </StyledFlex>
  );
}
