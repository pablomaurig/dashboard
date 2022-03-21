import * as React from 'react';
import { NavLink } from "react-router-dom";
import { MdDashboard, MdOutlineAlarm } from "react-icons/md";
import Header from './header';

const Layout = ({ children }) =>
  <div className="App">
    <Header />
    <nav>
      <NavLink className='NavItem' to="/dashboard" title='Dashboard'><MdDashboard /></NavLink>
      <NavLink className='NavItem' to="/alarms" title='Alarms'><MdOutlineAlarm /></NavLink>
    </nav>
    <main>
      {children}
    </main>
  </div>

export default Layout;
