import React from 'react';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import WinnersMain from './WinnersMain/WinnersMain';
import Container from './styles';

function WinnersPage() {
  return (
    <Container>
      <Header />
      <WinnersMain />
      <Footer />
    </Container>
  );
}
export default WinnersPage;
