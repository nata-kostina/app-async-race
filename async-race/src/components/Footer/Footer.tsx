import React from 'react';
import { ImgContainer, StyledFooter } from './styles';
import Img from '../../assets/images/footer-img.png';
import { Flex } from '../../styles/GlobalStyles';
import SchoolLogo from '../../assets/images/rs_school_js.png';

function Footer() {
  return (
    <StyledFooter>
      <Flex direction="row" align="end" justify="space-between">
        <img src={SchoolLogo} alt="school-logo" width="150px" />
        <p>Rolling Scope School, 2022</p>
        <a href="https://github.com/nata-kostina">GitHub</a>
        <ImgContainer>
          <img src={Img} alt="geometric figures" />
        </ImgContainer>
      </Flex>
    </StyledFooter>
  );
}

export default Footer;
