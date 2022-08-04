/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import Header from '../../components/Header';
import { StateContext } from '../../state/State';
import Winners from './Winners';

function WinnersContainer() {
  return (
    <div>
      WinnersContainer
      <StateContext.Consumer>
        {(state) => (
          <div>
            <Header state={state} />
            <Winners state={state} />
          </div>
        )}
      </StateContext.Consumer>
    </div>
  );
}

export default WinnersContainer;
