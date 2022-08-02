import { useState, useEffect } from 'react';

export function useToggleButtons() {
  const [isBtnStartDisabled, setIsBtnStartDisabled] = useState(false);
  const [isBtnStopDisabled, setIsBtnStopDisabled] = useState(true);
  const toggleButtons = () => {
    setIsBtnStartDisabled(!isBtnStartDisabled);
    setIsBtnStopDisabled(!isBtnStopDisabled);
  };
  return [isBtnStartDisabled, isBtnStopDisabled, toggleButtons];
}

export function useOnFinishAnimation(action: () => void) {
  const [isFinished, setIsFinished] = useState(false);
  useEffect(() => {
    if (isFinished) { action(); }
  }, [isFinished]);
  return [isFinished, setIsFinished];
}

export function useToggleBtn() {
  const [isBtnDisabled, setIsBtnDisabled] = useState(false);
  const toggleButtons = () => {
    setIsBtnDisabled(!isBtnDisabled);
  };
  return [isBtnDisabled, toggleButtons];
}
