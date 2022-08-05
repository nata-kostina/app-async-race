import { createGlobalStyle } from 'styled-components';
import DINBold from '../assets/fonts/DIN-Bold.ttf';
import DINRegular from '../assets/fonts/DIN-Regular.ttf';

const GlobalStyle = createGlobalStyle`
@font-face {
  font-family: DINBold;
  src: url(${DINBold}) format('truetype');
}

@font-face {
  font-family: DINRegular;
  src: url(${DINRegular}) format('truetype');
}
`;

export default GlobalStyle;
