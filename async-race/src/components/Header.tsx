import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { IState } from '../types/types';
import Modal from './ui/Modal/Modal';

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
    <div className="Header">
      <nav>
        <Link to="/garage">Garage</Link>
        <Link to="/winners" onClick={(e) => onWinnersLinkClicked(e)}>Winners</Link>
      </nav>
      <Modal
        isShown={showModal}
        headerText="Info"
        onCloseClicked={onModalClosed}
      >
        <div>
          Please wait until the race finishes
        </div>
      </Modal>
    </div>
  );
}

export default Header;
