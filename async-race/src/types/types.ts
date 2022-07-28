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
