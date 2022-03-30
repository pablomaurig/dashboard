type StatusChecboxProps = {
  checked: boolean;
  setChecked: Function;
};

const StatusCheckbox = ({ checked, setChecked }: StatusChecboxProps) => (
  <label htmlFor='status'>
    Alarm status:
    <input
      value={checked.toString()}
      type='checkbox'
      id='status'
      name='status'
      checked={checked}
      onChange={() => setChecked((prevState: boolean) => !prevState)}
    />
    {checked ? 'On' : 'Off'}
  </label>
);

export default StatusCheckbox;
