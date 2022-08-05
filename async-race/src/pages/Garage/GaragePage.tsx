/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import { StateContext } from '../../state/State';
import GarageMain from './GarageMain/GarageMain';
import Container from './styles';

function GaragePage() {
  return (
    <StateContext.Consumer>
      {(state) => (
        <Container>
          <Header state={state} />
          <GarageMain state={state} />
          <Footer />
        </Container>
      )}
    </StateContext.Consumer>
  );
}

export default GaragePage;
