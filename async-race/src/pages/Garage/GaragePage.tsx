import React from 'react';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import GarageMain from './GarageMain/GarageMain';
import Container from './styles';

function GaragePage() {
  return (
    <Container>
      <Header />
      <GarageMain />
      <Footer />
    </Container>

  );
}

export default GaragePage;
