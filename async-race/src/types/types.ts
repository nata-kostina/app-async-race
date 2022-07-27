export interface FetchRequest {
  url: string;
  params?: {
    [key: string]: string;
  }
}

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
}

export interface ModalProps {
  isShown: boolean;
  ModalContent: React.FunctionComponent;
  headerText: string;
  onCloseClicked: () => void;
}
