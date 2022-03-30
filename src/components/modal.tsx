import React from 'react';
import ReactDom from 'react-dom';

type ModalProps = {
  isOpen: boolean;
  children: React.ReactChild | React.ReactChild[];
};

// React.ReactChild | React.ReactChild[];
const Modal = ({ isOpen, children }: ModalProps) => {
  if (!isOpen) return null;

  return ReactDom.createPortal(
    <div className='modal'>
      <div className='modal-content'>{children}</div>
    </div>,
    document.getElementById('portal')
  );
};

export default Modal;
