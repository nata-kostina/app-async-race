import { createContext } from 'react';
import { IState } from '../types/types';

export const State: IState = {
  winners: [],
  isRacing: false,
};
export const StateContext = createContext(State);
