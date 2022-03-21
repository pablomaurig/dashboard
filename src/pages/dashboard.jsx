import { useAlarms } from "../context/alarms";

const Dashboard = () => {
  const { state } = useAlarms();
  const { alarms } = state;
  return (
    <>
      <h2>Dashboard</h2>
      {alarms.map(alarm => <div key={alarm.id}>{alarm.name}</div>)}
    </>
  );
}

export default Dashboard;