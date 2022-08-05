import styled from 'styled-components';
import TextureYellow from '../../assets/images/texture-yellow.png';

export const StyledLogo = styled.div`
  position: relative;
  height: ${({ theme }) => (theme === 'normal' ? '170px' : '300px')};;
`;

export const StyledImg = styled.img`
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
`;

export const TextOverlay = styled.div`
width: 100%;
font-family: DINBold, sans-serif;
line-height: 115px;
letter-spacing: 0.065em;
color: transparent;
background-image: url(${TextureYellow});
background-clip: text;
-webkit-background-clip: text;
background-repeat: repeat;
background-position: center;
background-size: 20%;
-webkit-text-stroke-width: 4px;
-webkit-text-stroke-color: black;
transform: rotate(-2.29deg);
& h1 {
  text-transform: uppercase;
  font-size: ${({ theme }) => (theme === 'normal' ? '72px' : '96px')};
}`;
