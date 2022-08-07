import styled from 'styled-components';

import { Link } from 'react-router-dom';
import { NavigationProps } from '../../types/types';

export const StyledNavigation = styled.nav<NavigationProps>`
display: flex;
flex-direction: ${({ theme }) => (theme === 'normal' ? 'row' : 'column') || 'column'} ;
align-items: flex-start;
padding: ${({ theme }) => (theme === 'normal' ? '0' : '2em') || '0'} ;
gap: 21px;
`;

export const StyledLink = styled(Link)<NavigationProps>`
font-family: 'DIN-Bold';
font-style: normal;
font-weight: 700;
font-size: ${({ theme }) => (theme === 'normal' ? '32px' : '72px') || '26px'} ;
line-height: 86px;
text-transform: ${({ theme }) => (theme === 'normal' ? 'none' : 'uppercase') || 'none'} ;;
text-decoration: none;
-webkit-text-stroke-width: ${({ theme }) => (theme === 'normal' ? '1px' : '2px') || 'none'};
-webkit-text-stroke-color: black;
text-shadow: ${({ theme }) => (theme === 'normal' ? 'none' : '-3px 2px 0px #000000;') || 'none'};
color: #FFD846;
letter-spacing: 0.4rem;

transition: color .2s ease-in;
&:hover {
  color: #DA0D6C;
  // linear-gradient(180deg, #DA0D6C 55.73%, #EBADCA 86.98%);
}
@media (max-width: 768px) {
    font-size: 22px;
  }
`;
