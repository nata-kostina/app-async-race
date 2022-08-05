/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import Flex from '../Flex';
import { ImgContainer, StyledFooter } from './styles';
import Img from '../../assets/images/footer-img.png';

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
