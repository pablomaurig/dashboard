import React, { useState, useEffect } from 'react';
import AlarmsService from '../services/clases/alarms'

const AlarmsContext = React.createContext()

const AlarmsProvider = ({children}) => {
  const [alarms, setAlarms] = useState([]);
  const [filteredAlarms, setFilteredAlarms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searching, setSearching] = useState(false);

  const fetchAlarms = async () => {
    try {
      setLoading(true)
      const alarmsList = await AlarmsService.getList()
      setAlarms(alarmsList)
      setFilteredAlarms(alarmsList)
      setLoading(false)
    } catch(error) {
      console.log('Error ferching alarms list: ', error.message)
    }
  }

  const updateAlarm = async (alarm) => {
    try {
      const alarmsList = await AlarmsService.updateAlarm(alarms, alarm)
      setAlarms(alarmsList)
    } catch(error) {
      console.log('Error updating alarm: ', error.message)
    }
  }

  const tooglePause = async (alarm) => {
    try {
      const alarmsList = await AlarmsService.updateAlarm(alarms, {...alarm, paused: !alarm.paused })
      setAlarms(alarmsList)
    } catch(error) {
      console.log('Error toogle pause alarm: ', error.message)
    }
  }

  const deleteAlarm = async (alarm) => {
    try {
      const alarmsList = await AlarmsService.deleteAlarm(alarms, alarm)
      setAlarms(alarmsList)
    } catch(error) {
      console.log('Error deleting alarm: ', error.message)
    }
  }

  const createAlarm = async (alarm) => {
    try {
      const alarmsList = await AlarmsService.createAlarm(alarms, alarm)
      setAlarms(alarmsList)
    } catch(error) {
      console.log('Error creating alarm: ', error.message)
    }
  }

  const searchAlarm = (value, status) => {
    setSearching(true)
    const filterAlarms = alarms.filter(alarm => alarm.name.toString().toLowerCase().includes(value.toString().toLowerCase()) && alarm.active === status)
    setFilteredAlarms(filterAlarms)
  }

  const clearSearch = () => {
    setSearching(false)
    setFilteredAlarms(alarms)
  }

  useEffect(() => {
    fetchAlarms();
  }, [])

  useEffect(() => {
    !searching && setFilteredAlarms(alarms)
  }, [searching])

  useEffect(() => {
    !searching && setFilteredAlarms(alarms)
  }, [alarms])

  return <AlarmsContext.Provider value={{
    alarms,
    filteredAlarms,
    loading,
    searching,
    updateAlarm,
    tooglePause,
    deleteAlarm,
    createAlarm,
    searchAlarm,
    clearSearch
  }}>{children}</AlarmsContext.Provider>
}

const AlarmsConsumer = AlarmsContext.Consumer
export { AlarmsProvider, AlarmsConsumer, AlarmsContext }
