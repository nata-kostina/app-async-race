/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import Header from '../../components/Header';
import { StateContext } from '../../state/State';
import Garage from './Garage';

function GarageContainer() {
  return (
    <div>
      GarageContainer
      <StateContext.Consumer>
        {(state) => (
          <div>
            <Header state={state} />
            <Garage state={state} />
          </div>
        )}
      </StateContext.Consumer>
    </div>
  );
}

export default GarageContainer;
