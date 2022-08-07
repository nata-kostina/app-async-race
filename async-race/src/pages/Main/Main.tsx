import React from 'react';
import Logo from '../../components/Logo/Logo';
import Navigation from '../../components/Navigation/Navigation';
import Container from './styles';

function Main() {
  return (
    <Container>
      <Logo theme="main" />
      <Navigation theme="main" />
    </Container>
  );
}

export default Main;
