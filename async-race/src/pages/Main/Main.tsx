import React from 'react';
import styled from 'styled-components';
import Logo from '../../components/Logo/Logo';
// import Header from './components/Header';
import Background from '../../assets/images/background-main.png';
import Navigation from '../../components/Navigation/Navigation';

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  //padding: 2rem;
  background: url(${Background}), #e2e2e2;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  overflow: hidden;
`;
function Main() {
  return (
    <Container className="App">
      <Logo theme="main" />
      <Navigation theme="main" />
    </Container>
  );
}

export default Main;
