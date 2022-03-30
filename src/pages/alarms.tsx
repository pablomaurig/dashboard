import { useContext, useState } from 'react';
import { AlarmsContext } from '../context/alarms';
import ConfirmModal from '../components/confirmModal';
import FormModal from '../components/formModal';
import Button from '../components/button';
import { MdAdd } from 'react-icons/md';
import AlarmsFilter from '../components/alarmsFilter';
import Loader from '../components/loader';
import { Alarm } from '../models/alarms';

type ActionType = 'delete' | 'tooglePause' | 'initial';

const Alarms = () => {
  const alarmsContext = useContext(AlarmsContext);
  const [open, setOpen] = useState(false);
  const [openFormModal, setOpenFormModal] = useState(false);
  const [actionType, setActionType] = useState<ActionType>('initial');
  const [message, setMessage] = useState('');
  const [editAlarm, setEditAlarm] = useState<Alarm | undefined>();
  const {
    filteredAlarms,
    loading,
    updateAlarm,
    tooglePause,
    deleteAlarm,
    createAlarm,
  } = alarmsContext;

  const handleModal = (alarm: Alarm, action: ActionType, message: string) => {
    setEditAlarm(alarm);
    setActionType(action);
    setMessage(message);
    setOpen(true);
  };

  const handleFormModal = (alarm: Alarm | undefined) => {
    setEditAlarm(alarm);
    setOpenFormModal(true);
  };

  const handleSubmit = () => {
    switch (actionType) {
      case 'delete':
        deleteAlarm(editAlarm);
        break;
      case 'tooglePause':
        tooglePause(editAlarm);
        break;

      default:
        break;
    }
    setOpen(false);
  };

  const handleSubmitForm = (alarm: Alarm, type: string) => {
    switch (type) {
      case 'create':
        createAlarm(alarm);
        break;
      case 'edit':
        updateAlarm(alarm);
        break;

      default:
        break;
    }
    setOpenFormModal(false);
  };

  return loading ? (
    <Loader />
  ) : (
    <>
      <h2>Alarms</h2>
      <AlarmsFilter />
      <table className='table'>
        <thead>
          <tr>
            <th>Name</th>
            <th>Source</th>
            <th>Metric</th>
            <th>Trigger</th>
            <th>Paused</th>
            <th style={{ minWidth: '157px' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredAlarms.map(alarm => (
            <tr key={alarm.id}>
              <td>{alarm.name}</td>
              <td>{alarm.source}</td>
              <td>{alarm.metric}</td>
              <td>{alarm.trigger}</td>
              <td>{alarm.paused ? 'True' : 'False'}</td>
              <td>
                <Button onClick={() => handleFormModal(alarm)}>Edit</Button>
                <Button
                  onClick={() => handleModal(alarm, 'delete', 'Delete Alarm?')}
                >
                  Del
                </Button>
                <Button
                  onClick={() =>
                    handleModal(
                      alarm,
                      'tooglePause',
                      alarm.paused ? 'Resume alarm?' : 'Pause alarm?'
                    )
                  }
                >
                  {alarm.paused ? 'Resume' : 'Pause'}
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Button
        variant='rounded'
        onClick={() => handleFormModal(undefined)}
        className='floatingButton'
      >
        <MdAdd size='30' />
      </Button>
      <ConfirmModal
        isOpen={open}
        message={message}
        onClose={() => setOpen(false)}
        onSubmit={() => handleSubmit()}
      />
      <FormModal
        isOpen={openFormModal}
        alarm={editAlarm}
        type={editAlarm?.id ? 'create' : 'edit'}
        onClose={() => setOpenFormModal(false)}
        onSubmit={(item: Alarm, type: string) => handleSubmitForm(item, type)}
      />
    </>
  );
};

export default Alarms;
