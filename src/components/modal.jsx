import React from 'react';
import ReactDom from 'react-dom';

const Modal = ({ isOpen, children }) => {
  if(!isOpen) return null;

  return ReactDom.createPortal(
    <div className="modal">
      <div className="modal-content">
        {children}
      </div>
    </div>,
    document.getElementById('portal')
  )
}

export default Modal;