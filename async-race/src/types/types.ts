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
  ModalContent: React.FunctionComponent;
  headerText: string;
  onCloseClicked: () => void;
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
