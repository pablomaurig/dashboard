import { useAlarms } from "../context/alarms";

const Header = () => {
  const { state } = useAlarms();
  const activeAlarms = state.alarms.filter(alarm => (alarm.paused === false) && (alarm.active === true))

  return (
    <header className="App-header">
      Active alarms ({activeAlarms.length})
    </header>
  )
}


export default Header;