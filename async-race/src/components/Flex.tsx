import React from 'react';
import styled from 'styled-components';
import { FlexProps } from '../types/types';

const StyledFlex = styled.div<FlexProps>`
display: flex;
flex-direction: ${({ direction }) => direction || 'column'};
align-items: ${({ align }) => align || 'stretch'};
justify-content: ${({ justify }) => justify || 'center'};
height: ${({ height }) => height || '100%'};
margin: ${({ margin }) => margin || '0'};
padding: ${({ padding }) => padding || '0'};
`;

function Flex({ children, ...props }: FlexProps) {
  return (
    <StyledFlex {...props}>
      {children}
    </StyledFlex>
  );
}

export default Flex;
