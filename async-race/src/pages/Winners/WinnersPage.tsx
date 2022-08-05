/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import { StateContext } from '../../state/State';
import WinnersMain from './WinnersMain/WinnersMain';
import Container from './styles';

function WinnersPage() {
  return (
    <StateContext.Consumer>
      {(state) => (
        <Container>
          <Header state={state} />
          <WinnersMain state={state} />
          <Footer />
        </Container>

      )}
    </StateContext.Consumer>
  );
}

export default WinnersPage;
