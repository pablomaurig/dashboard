import React from 'react';

const StatusCheckbox = ({ checked, setChecked }) => (
  <label htmlFor='status'>
    Alarm status:
    <input value={checked} type='checkbox' id='status' name='status' checked={checked} onChange={() => setChecked(prevState => !prevState)} />
    {checked ? 'On' : 'Off'}
  </label>
)

export default StatusCheckbox;