import Modal from './modal';
import Button from './button';

type ConfirmModalProps = {
  isOpen: boolean;
  onSubmit: Function;
  onClose: Function;
  message: string;
};

const ConfirmModal = ({
  isOpen,
  onClose,
  onSubmit,
  message,
}: ConfirmModalProps) => (
  <Modal isOpen={isOpen}>
    <div>{message}</div>
    <br />
    <div className='buttonGroup'>
      <Button type='button' onClick={() => onSubmit()}>
        Confirm
      </Button>
      <Button type='button' variant='link' onClick={() => onClose()}>
        Cancel
      </Button>
    </div>
  </Modal>
);

export default ConfirmModal;
