import React from 'react';
import { Flex } from '../../styles/GlobalStyles';
import Logo from '../Logo/Logo';
import Navigation from '../Navigation/Navigation';

function Header() {
  return (
    <header>
      <Flex direction="row" align="start" justify="space-between">
        <Logo theme="normal" />
        <Navigation theme="normal" />
      </Flex>
    </header>
  );
}

export default Header;
