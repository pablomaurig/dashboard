import React, { useState, useEffect } from 'react';
import Modal from './modal';
import Button from './button';
import { Alarm, AlarmDTO } from '../models/alarms';

const emptyAlarm = {
  name: '',
  source: '',
  metric: '',
  trigger: '',
  paused: false,
  active: true,
};

type FormModalProps = {
  isOpen: boolean;
  alarm?: Alarm | AlarmDTO;
  onSubmit: Function;
  onClose: Function;
  type: 'create' | 'edit';
};

const FormModal = ({
  isOpen,
  alarm = emptyAlarm,
  onSubmit,
  onClose,
  type,
}: FormModalProps) => {
  const [editAlarm, setEditAlarm] = useState(alarm);
  const [paused, setPaused] = useState<boolean>(alarm?.paused || false);
  const [checked, setChecked] = useState<boolean>(alarm?.active || true);
  const isNewAlarm = type !== 'create';

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditAlarm(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleClose = () => {
    setEditAlarm(emptyAlarm);
    setPaused(false);
    setChecked(true);
    onClose();
  };

  console.log('isNewAlarm', isNewAlarm);

  const handleSubmit = () => {
    onSubmit({ ...editAlarm }, isNewAlarm ? 'create' : 'edit');
    setEditAlarm(emptyAlarm);
  };

  const updateStatus = () => {
    setChecked(prevState => !prevState);
    setEditAlarm({ ...editAlarm, active: checked });
  };

  const updatePaused = () => {
    setPaused(prevState => !prevState);
    setEditAlarm({ ...editAlarm, paused: paused });
  };

  useEffect(() => {
    // setIsNewAlarm(type === 'create');
    setEditAlarm(isNewAlarm ? emptyAlarm : alarm);
  }, [alarm]);

  return (
    <Modal isOpen={isOpen}>
      <h3>{isNewAlarm ? 'Create new alarm' : 'Edit alarm'}</h3>
      <div className='formGroup'>
        <label htmlFor='name'>Name</label>
        <input
          id='name'
          name='name'
          className='input'
          type='text'
          value={editAlarm.name}
          onChange={handleChange}
        />
      </div>
      <div className='formGroup'>
        <label htmlFor='source'>Source</label>
        <input
          id='source'
          name='source'
          className='input'
          type='text'
          value={editAlarm.source}
          onChange={handleChange}
        />
      </div>
      <div className='formGroup'>
        <label htmlFor='metric'>Metric</label>
        <input
          id='metric'
          name='metric'
          className='input'
          type='text'
          value={editAlarm.metric}
          onChange={handleChange}
        />
      </div>
      <div className='formGroup'>
        <label htmlFor='trigger'>Trigger</label>
        <input
          id='trigger'
          name='trigger'
          className='input'
          type='text'
          value={editAlarm.trigger}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor='active'>
          Alarm status:
          <input
            value={checked.toString()}
            type='checkbox'
            id='active'
            name='active'
            checked={checked}
            onChange={updateStatus}
          />
          {checked ? 'On' : 'Off'}
        </label>
      </div>
      <div>
        <label htmlFor='paused'>
          Paused:
          <input
            value={paused.toString()}
            type='checkbox'
            id='paused'
            name='paused'
            checked={paused}
            onChange={updatePaused}
          />
          {!paused ? 'Off' : 'On'}
        </label>
      </div>
      <div className='buttonGroup'>
        <Button type='button' onClick={handleSubmit}>
          Save
        </Button>
        <Button type='button' variant='link' onClick={() => handleClose()}>
          Cancel
        </Button>
      </div>
    </Modal>
  );
};

export default FormModal;
