import React, {
  ReactNode,
} from 'react';
import { createPortal } from 'react-dom';
import {
  Backdrop, StyledBtnClose, StyledModal, StyledModalInner,
} from './styles';

interface IPortal {
  closeModal: () => void;
  children: ReactNode;
}
const Portal = ({ closeModal, children }: IPortal) => {
  const modal = (
    <div className="portal-container">
      <Backdrop>
        <StyledModal>
          <StyledModalInner>
            {children}
            <StyledBtnClose onClick={closeModal}>X</StyledBtnClose>
          </StyledModalInner>
        </StyledModal>
      </Backdrop>
    </div>
  );
  return createPortal(modal, document.getElementById('root') as HTMLElement);
};

export default Portal;
