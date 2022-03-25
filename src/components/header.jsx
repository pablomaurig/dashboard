import { AlarmsContext } from "../context/alarms";
import React, { useContext } from 'react';
import { NavLink } from "react-router-dom";
import { MdNotificationsActive } from "react-icons/md";

const Header = () => {
  const alarmsContext = useContext(AlarmsContext);
  const { alarms } = alarmsContext;
  const activeAlarms = alarms.filter(alarm => (alarm.paused === false) && (alarm.active === true))

  return (
    <header className="App-header">
      <NavLink className='NavItem' to="/alarms" title='Alarms'>
        <div className="badge">
          <MdNotificationsActive />
          {activeAlarms.length > 0 && (
            <span>{activeAlarms.length}</span>
          )} 
        </div>
      </NavLink>
    </header>
  )
}


export default Header;