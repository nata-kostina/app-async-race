import { createContext } from 'react';
import { IState } from '../types/types';

export const State: IState = {
  winners: [],
  isRacing: false,
  currentGaragePage: 1,
  currentWinnersPage: 1,
};
export const StateContext = createContext(State);
