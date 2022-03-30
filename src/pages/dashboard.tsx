import { useContext } from 'react';
import { AlarmsContext } from '../context/alarms';
import Loader from '../components/loader';
import Charts from '../components/charts';

const Dashboard = () => {
  const alarmsContext = useContext(AlarmsContext);
  const { alarms, loading } = alarmsContext;

  return (
    <>
      <h2>Dashboard</h2>
      <div className='grid'>
        <div>
          {loading ? (
            <Loader />
          ) : (
            <p>{`${
              alarms.filter(alarm => !alarm.paused && alarm.active).length
            }/${alarms.length} Alarms tuned on`}</p>
          )}
        </div>
        <div>
          <Charts />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
