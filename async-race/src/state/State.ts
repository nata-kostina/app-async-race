import { createContext } from 'react';
import { ModalType } from '../types/types';
import { IState, IStateContext } from './types';

export const initialState: IState = {
  winners: [],
  isRacing: false,
  isRaceStarted: false,
  currentGaragePage: 1,
  currentWinnersPage: 1,
  animElements: [],
  driveCarPromises: [],
  carsTime: [],
  winner: null,
  modal: ModalType.DEFAULT,
  modalVisibility: false,
};

export const StateContext = createContext<IStateContext>({ state: initialState, dispatch: () => null });
