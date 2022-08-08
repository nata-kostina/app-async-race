import React from 'react';
import { ImgContainer, StyledFooter } from './styles';
import Img from '../../assets/images/footer-img.png';
import { Flex } from '../../styles/GlobalStyles';

function Footer() {
  return (
    <StyledFooter>
      <Flex direction="row" align="end" justify="space-between">
        <ImgContainer>
          <img src={Img} alt="geometric figures" />
        </ImgContainer>
      </Flex>
    </StyledFooter>
  );
}

export default Footer;
