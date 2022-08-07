import { MutableRefObject } from 'react';

export interface FetchRequest {
  url: string;
  method: string;
  queryParams?: {
    [key: string]: string;
  }
  dataParams?: {
    [key: string]: string | number;
  }
}

export type UpdateCarParams = {
  name: string,
  color: string
};

export interface Car {
  name: string,
  color: string,
  id: number,
}

export type CarValues = Omit<Car, 'id'>;

export interface FormInputProps {
  id: string;
  label: string;
  type: string;
  val: string;
  placeholder?: string;
  onChanged: (value: string) => void;
}

export interface ModalProps {
  isShown: boolean;
  headerText: string;
  onCloseClicked: () => void;
  children?: React.ReactNode;
}

export enum EngineStatus {
  STARTED = 'started',
  STOPPED = 'stopped',
  DRIVE = 'drive',
}

export interface EngineResponse {
  velocity: number,
  distance: number,
}

export interface EngineDriveModeResponse {
  'success': true
}

export interface AnimationElement {
  animRef: MutableRefObject<Animation>;
  carRef: MutableRefObject<HTMLDivElement>;
  time?: number;
  carId: number;
}
export enum Result {
  SUCCESS = 'success',
  FAIL = 'fail',
}
export interface DriveCarResult {
  carId: number;
  result: Result;
  time: number;
}

export interface WinnerForStats {
  carId: number;
  name: string;
  time: number;
  image: () => JSX.Element;
  winsNum: number;
}

export interface GetWinnerResponse {
  id: number,
  wins: number,
  time: number,
}

export interface WinnerCar extends Car {
  time: number;
}

export enum SortType {
  ID = 'id',
  WINS = 'wins',
  TIME = 'time,',
}

export enum OrderType {
  ASC = 'asc',
  DESC = 'desc',
}

export type UpdateWinnerParams = {
  wins: number,
  time: number,
  id?: number,
};

export interface FlexProps {
  align?: string;
  justify?: string;
  direction?: string;
  margin?: string;
  padding?: string;
  height?: string;
  children: React.ReactNode;
}
export interface StyledProps {
  children: React.ReactNode;
}

export interface NavigationProps {
  theme: string;
}

export interface ThemeProps {
  theme: string;
}

export interface ButtonProps {
  disabled?: boolean;
  color?: string;
}

export enum GarageActions {
  CREATE = 'create',
  EDIT = 'edit',
  DELETE = 'delete',
  GENERATE = 'generate',
  DEFAULT = 'default',
}

export enum ModalType {
  FORM_CREATE = 'form_create',
  FORM_EDIT = 'form_edit',
  SHOW_WINNER = 'show_winner',
  DEFAULT = 'default',
}
