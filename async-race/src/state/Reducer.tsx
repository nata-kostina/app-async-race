import {
  AnimationElement, DriveCarResult, ModalType, WinnerCar,
} from '../types/types';
import { Action, ActionTypes, IState } from './types';

export function stateReducer(state: IState, action: Action): IState {
  const { type, payload } = action;
  switch (type) {
    case ActionTypes.SET_IS_RACING:
      return { ...state, isRacing: payload as boolean };
    case ActionTypes.SET_IS_RACE_STARTED:
      return { ...state, isRaceStarted: payload as boolean };
    case ActionTypes.SET_ANIM_ELEMENT:
      const payloadAE = payload as AnimationElement;
      const animEl = state.animElements.find((e) => e.carId === payloadAE.carId);
      if (animEl) {
        const result = state.animElements.map((e) => (e === animEl ? payloadAE : e));
        return { ...state, animElements: [...result] };
      }
      return { ...state, animElements: [...state.animElements, payload as AnimationElement] };
    case ActionTypes.ADD_PROMISE:
      return { ...state, driveCarPromises: [...state.driveCarPromises, payload as Promise<DriveCarResult>] };
    case ActionTypes.CLEAR_ANIM_ELEMENTS:
      return { ...state, animElements: [] };
    case ActionTypes.CLEAR_ANIM_ELEMENT:
      const filtered = state.animElements.filter((e) => e.carId !== (payload as number));
      return { ...state, animElements: [...filtered] };
    case ActionTypes.CLEAR_DRIVE_CAR_PROMISES:
      return { ...state, driveCarPromises: [] };
    case ActionTypes.ADD_TIME_TO_ANIM_EL:
      const currentPayload = payload as { time: number, id: number };
      const el = state.animElements.find((e) => e.carId === currentPayload.id);
      if (el) {
        const result = state.animElements.map((e) => (e === el ? { ...e, time: currentPayload.time } : e));
        return { ...state, animElements: [...result] };
      }
      return state;
    case ActionTypes.ADD_TIME:
      const arr = [...state.carsTime, payload] as { carId: number, time: number }[];
      return { ...state, carsTime: arr };
    case ActionTypes.CLEAR_TIME_ARR:
      return { ...state, carsTime: [] };
    case ActionTypes.SET_WINNER:
      return { ...state, winner: payload as WinnerCar | null };
    case ActionTypes.SET_GARAGE_PAGE:
      return { ...state, currentGaragePage: payload as number };
    case ActionTypes.SET_WINNERS_PAGE:
      return { ...state, currentWinnersPage: payload as number };
    case ActionTypes.SET_MODAL:
      return { ...state, modal: payload as ModalType };
    case ActionTypes.SET_MODAL_VISIBILITY:
      return { ...state, modalVisibility: payload as boolean };
    default:
      return state;
  }
}
export default stateReducer;
