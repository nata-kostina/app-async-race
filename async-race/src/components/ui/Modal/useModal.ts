import { useState } from 'react';

const useModal = (): [boolean, () => void, () => void] => {
  const [isShown, setIsShown] = useState(false);
  const openModal = () => setIsShown(true);
  const closeModal = () => setIsShown(false);
  return [isShown, openModal, closeModal];
};

export default useModal;
