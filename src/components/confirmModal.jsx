import React from 'react';
import Modal from './modal';
import Button from './button';

const FormModal = ({ isOpen, onClose, onSubmit, message }) => (
  <Modal isOpen={isOpen}>
    <div>{message}</div>
    <br />
    <div className='buttonGroup'>
      <Button type='button' onClick={() => onSubmit()}>Confirm</Button>
      <Button type='Button' variant='link' onClick={() => onClose()}>Cancel</Button>
    </div>
  </Modal>
)


export default FormModal;