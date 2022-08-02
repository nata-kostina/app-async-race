import { MutableRefObject } from 'react';

export interface FetchRequest {
  url: string;
  method: string;
  queryParams?: {
    [key: string]: string;
  }
  dataParams?: {
    [key: string]: string;
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

function pow(x: number, n: number): number {
  if (n === 1) {
    return x;
  }
  return x * pow(x, n - 1);
}

pow(2, 3);
