import { useState } from 'react';

export function useToggleButtons() {
  const [isBtnStartDisabled, setIsBtnStartDisabled] = useState(false);
  const [isBtnStopDisabled, setIsBtnStopDisabled] = useState(true);
  const toggleButtons = () => {
    setIsBtnStartDisabled(!isBtnStartDisabled);
    setIsBtnStopDisabled(!isBtnStopDisabled);
  };
  return [isBtnStartDisabled, isBtnStopDisabled, toggleButtons];
}

export function useToggleBtn() {
  const [isBtnDisabled, setIsBtnDisabled] = useState(false);
  const toggleButtons = () => {
    setIsBtnDisabled(!isBtnDisabled);
  };
  return [isBtnDisabled, toggleButtons];
}
