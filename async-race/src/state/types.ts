import {
  AnimationElement, DriveCarResult, ModalType, WinnerCar, WinnerForStats,
} from '../types/types';

export interface IState {
  winners: WinnerForStats[],
  isRacing: boolean,
  isRaceStarted: boolean,
  currentGaragePage: number,
  currentWinnersPage: number,
  animElements: AnimationElement[],
  driveCarPromises: Promise<DriveCarResult>[],
  carsTime: { carId: number, time: number } [],
  winner: WinnerCar | null,
  modal: ModalType,
  modalVisibility: boolean,
}

export interface IStateContext {
  state: IState,
  dispatch: React.Dispatch<Action>,
}
export type SetRacing = {
  type: ActionTypes.SET_IS_RACING,
  payload: boolean;
};

export type SetIsRaceStarted = {
  type: ActionTypes.SET_IS_RACE_STARTED,
  payload: boolean;
};

export type SetGaragePage = {
  type: ActionTypes.SET_GARAGE_PAGE,
  payload: number;
};

export type SetWinnersPage = {
  type: ActionTypes.SET_WINNERS_PAGE,
  payload: number;
};

export type SetAnimElement = {
  type: ActionTypes.SET_ANIM_ELEMENT,
  payload: AnimationElement;
};

export type ClearAnimElements = {
  type: ActionTypes.CLEAR_ANIM_ELEMENTS,
  payload: [];
};

export type ClearAnimElement = {
  type: ActionTypes.CLEAR_ANIM_ELEMENT,
  payload: number;
};

export type ClearDriveCarPromises = {
  type: ActionTypes.CLEAR_DRIVE_CAR_PROMISES,
  payload: [];
};

export type AddTimeToAnimElement = {
  type: ActionTypes.ADD_TIME_TO_ANIM_EL,
  payload: { time: number, id: number },
};

export type AddPromise = {
  type: ActionTypes.ADD_PROMISE,
  payload: Promise<DriveCarResult>,
};

export type AddTime = {
  type: ActionTypes.ADD_TIME,
  payload: { carId: number, time: number },
};

export type SetWinner = {
  type: ActionTypes.SET_WINNER,
  payload: WinnerCar | null,
};

export type ClearTimeArr = {
  type: ActionTypes.CLEAR_TIME_ARR,
  payload: null,
};

export type SetModal = {
  type: ActionTypes.SET_MODAL,
  payload: ModalType,
};

export type SetModalVisibility = {
  type: ActionTypes.SET_MODAL_VISIBILITY,
  payload: boolean;
};

export type Action = SetRacing |
SetGaragePage |
SetWinnersPage |
SetAnimElement |
AddTimeToAnimElement |
AddPromise |
ClearAnimElements |
ClearDriveCarPromises |
ClearAnimElement |
SetIsRaceStarted |
AddTime |
SetWinner |
ClearTimeArr |
SetModal |
SetModalVisibility;

export enum ActionTypes {
  SET_GARAGE_PAGE = 'set_garage_page',
  SET_WINNERS_PAGE = 'set_winners_page',
  SET_IS_RACING = 'set_is_racing',
  SET_ANIM_ELEMENT = 'set_anim_element',
  ADD_TIME_TO_ANIM_EL = 'add_time_to_element',
  ADD_PROMISE = 'add_promise',
  CLEAR_ANIM_ELEMENTS = 'clear_anim_elements',
  CLEAR_ANIM_ELEMENT = 'clear_anim_element',
  CLEAR_DRIVE_CAR_PROMISES = 'clear_drive_car-promises',
  SET_IS_RACE_STARTED = 'set_is_race_started',
  ADD_TIME = 'add_time',
  CLEAR_TIME_ARR = 'clear_time_arr',
  SET_MODAL = 'set_modal',
  SET_WINNER = 'set_winner',
  SET_MODAL_VISIBILITY = 'set_modal_visibility',
}
