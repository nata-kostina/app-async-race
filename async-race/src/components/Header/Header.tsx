/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import { IState } from '../../types/types';
import Flex from '../Flex';
import Logo from '../Logo/Logo';
import Navigation from '../Navigation/Navigation';
import Modal from '../ui/Modal/Modal';

interface HeaderProps {
  state: IState;
}
function Header({ state }: HeaderProps) {
  const [showModal, setShowModal] = useState(false);

  const onModalClosed = () => {
    setShowModal(false);
  };

  const onWinnersLinkClicked = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    if (state.isRacing) {
      e.preventDefault();
      setShowModal(true);
    }
  };
  return (
    <header>
      <Flex direction="row" align="start" justify="space-between">
        <Logo theme="normal" />
        <Navigation theme="normal" />
      </Flex>
      <Modal
        isShown={showModal}
        headerText="Info"
        onCloseClicked={onModalClosed}
      >
        <div>
          Please wait until the race finishes
        </div>
      </Modal>
    </header>
  );
}

export default Header;
