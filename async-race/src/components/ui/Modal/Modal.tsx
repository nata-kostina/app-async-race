import React from 'react';
import ReactDOM from 'react-dom';
import { ModalProps } from '../../../types/types';

function Modal({
  isShown, headerText, onCloseClicked, children,
}: ModalProps) {
  const modal = (
    <div>
      <div className="backdrop" />
      <div className="modal">
        <div className="modal__inner">
          <div className="modal__header">{headerText}</div>
          <div className="modal__content">{children}</div>
          <button type="button" onClick={() => onCloseClicked()}>Close</button>
        </div>
      </div>
    </div>
  );
  return isShown ? ReactDOM.createPortal(modal, document.getElementById('root') as HTMLElement) : null;
}

export default Modal;
