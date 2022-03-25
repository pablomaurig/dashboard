import React, { useState, useEffect } from 'react';
import Modal from './modal';
import Button from './button';

const emptyAlarm = {
  name: '',
  source: '',
  metric: '',
  trigger: '',
  paused: false,
  active: true,
}

const FormModal = ({ isOpen, alarm = emptyAlarm, onSubmit, onClose }) => {
  const isNewAlarm = Object.keys(alarm).length === 0;
  const [ editAlarm, setEditAlarm] = useState(alarm)
  const [paused, setPaused] = useState(alarm.paused | false);
  const [checked, setChecked] = useState(alarm.active | true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditAlarm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleClose = () => {
    setEditAlarm(emptyAlarm)
    setPaused(false)
    setChecked(true)
    onClose()
  }

  const handleSubmit = () => {
    onSubmit({...editAlarm}, isNewAlarm ? 'create' : 'edit')
    setEditAlarm(emptyAlarm)
  }

  const updateStatus = () => {
    setChecked(prevState => !prevState)
    setEditAlarm({...editAlarm, active: checked})
  }

  const updatePaused = () => {
    setPaused(prevState => !prevState)
    setEditAlarm({...editAlarm, paused: paused})
  }

  useEffect(() => {
    setEditAlarm(isNewAlarm ? emptyAlarm : alarm)
  }, [alarm])

  return (
    <Modal  isOpen={isOpen}>
      <h3>{isNewAlarm ? 'Create new alarm' : 'Edit alarm'}</h3>
      <div className='formGroup'>
        <label htmlFor='name'>Name</label>
        <input id='name' name="name" className="input" type='text' value={editAlarm.name} onChange={handleChange} />
      </div>
      <div className='formGroup'>
        <label htmlFor='name'>Name</label><input name="source" className="input" type='text' value={editAlarm.source} onChange={handleChange} />
        </div>
      <div className='formGroup'>
        <label htmlFor='name'>Name</label><input name="metric" className="input" type='text' value={editAlarm.metric} onChange={handleChange} />
      </div>
      <div className='formGroup'>
        <label htmlFor='name'>Name</label><input name="trigger" className="input" type='text' value={editAlarm.trigger} onChange={handleChange} />
      </div>
      <div>
        <label htmlFor='active'>
          Alarm status:
          <input value={checked} type='checkbox' id='active' name='active' checked={checked} onChange={updateStatus} />
          {checked ? 'On' : 'Off'}
        </label>
      </div>
      <div>
        <label htmlFor='paused'>
          Paused:
          <input value={paused} type='checkbox' id='paused' name='paused' checked={paused} onChange={updatePaused} />
          {!paused ? 'Off' : 'On'}
        </label>
      </div>
      <div className='buttonGroup'>
        <Button type='button' onClick={() => handleSubmit()}>Save</Button>
        <Button type='Button' variant='link' onClick={() => handleClose()}>Cancel</Button>
      </div>
    </Modal>
  )
}


export default FormModal;