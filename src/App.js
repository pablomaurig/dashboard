import Dashboard from './pages/dashboard';
import Alarms from './pages/alarms';
import { AlarmsProvider } from './context/alarms';
import Layout from './components/layout';
import {
  Routes,
  Route,
} from "react-router-dom";
import './app.css'

function App() {
  return (
    <AlarmsProvider>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="alarms" element={<Alarms />} />
        </Routes>
      </Layout>
    </AlarmsProvider>
  );
}

export default App;
