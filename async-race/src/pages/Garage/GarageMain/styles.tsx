import styled from 'styled-components';
import TextureYellow from '../../../assets/images/texture-yellow.png';
import TexturePink from '../../../assets/images/texture-pink.png';

export const Container = styled.div`
  width: 100%;
  overflow: hidden;
  padding: 0 1rem;
`;

export const StyledMain = styled.main`
flex-grow: 1;
`;

export const StyledBtn = styled.button`
margin-bottom: 5px;

font-family: DINBold, sans-serif;
color: transparent;

background-image: url(${TextureYellow});
background-repeat: repeat;
background-position: center;
background-size: 20%;

background-clip: text;
-webkit-background-clip: text;

-webkit-text-stroke-width: 1px;
-webkit-text-stroke-color: black;

outline: none;
border: none;

transition: all .2s ease-in;

& span {
  font-size: 24px;
}

&:disabled {
  background-image: none;
  background-color: #e2e2e2;
}
&:hover:enabled {
  cursor: pointer;
  background-image: url(${TexturePink});
}
`;
