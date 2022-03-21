import { useAlarms } from "../context/alarms";

const Alarms = () => {
  const { state, dispatch } = useAlarms();
  console.log('state', state)
  const { alarms } = state;
  return (
    <>
      <h2>Alarms</h2>
      <table style={{width: '100%'}}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Source</th>
            <th>Metric</th>
            <th>Trigger</th>
            <th>Paused</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
            {alarms.map(alarm => (
            <tr key={alarm.id}>
              <td>{alarm.name}</td>
              <td>{alarm.source}</td>
              <td>{alarm.metric}</td>
              <td>{alarm.trigger}</td>
              <td>{alarm.paused ? 'True' : 'False'}</td>
              <td>
                <button type='button'>Edit</button>
                <button type='button'>Del</button>
                <button type='button'>Resume</button>
              </td>
            </tr>
            ))}
        </tbody>
      </table>
      
    </>
  );
}

export default Alarms;