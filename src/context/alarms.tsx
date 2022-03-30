import React, { useState, useEffect } from 'react';
import AlarmsService from '../services/clases/alarms';
import { Alarm } from '../models/alarms';

type AlarmsContextType = {
  alarms?: Alarm[];
  filteredAlarms?: Alarm[];
  loading?: boolean;
  searching?: boolean;
  updateAlarm?: Function;
  tooglePause?: Function;
  deleteAlarm?: Function;
  createAlarm?: Function;
  searchAlarm?: Function;
  clearSearch?: Function;
};

const AlarmsContext = React.createContext<AlarmsContextType>({});

const AlarmsProvider = ({ children }: React.PropsWithChildren<{}>) => {
  const [alarms, setAlarms] = useState<Alarm[]>([]);
  const [filteredAlarms, setFilteredAlarms] = useState<Alarm[]>([]);
  const [loading, setLoading] = useState(false);
  const [searching, setSearching] = useState(false);

  const fetchAlarms = async () => {
    try {
      setLoading(true);
      const alarmsList = await AlarmsService.getList();
      setAlarms(alarmsList);
      setFilteredAlarms(alarmsList);
      setLoading(false);
    } catch (error) {
      console.log('Error ferching alarms list: ', error);
    }
  };

  const updateAlarm = async (alarm: Alarm) => {
    try {
      const alarmsList: Alarm[] = await AlarmsService.updateAlarm(
        alarms,
        alarm
      );
      setAlarms(alarmsList);
    } catch (error) {
      console.log('Error updating alarm: ', error);
    }
  };

  const tooglePause = async (alarm: Alarm) => {
    try {
      const alarmsList = await AlarmsService.updateAlarm(alarms, {
        ...alarm,
        paused: !alarm.paused,
      });
      setAlarms(alarmsList);
    } catch (error) {
      console.log('Error toogle pause alarm: ', error);
    }
  };

  const deleteAlarm = async (alarm: Alarm) => {
    try {
      const alarmsList = await AlarmsService.deleteAlarm(alarms, alarm);
      setAlarms(alarmsList);
    } catch (error) {
      console.log('Error deleting alarm: ', error);
    }
  };

  const createAlarm = async (alarm: Alarm) => {
    try {
      const alarmsList = await AlarmsService.createAlarm(alarms, alarm);
      setAlarms(alarmsList);
    } catch (error) {
      console.log('Error creating alarm: ', error);
    }
  };

  const searchAlarm = (value: string, status: boolean) => {
    setSearching(true);
    const filterAlarms = alarms.filter(
      alarm =>
        alarm.name
          .toString()
          .toLowerCase()
          .includes(value.toString().toLowerCase()) && alarm.active === status
    );
    setFilteredAlarms(filterAlarms);
  };

  const clearSearch = () => {
    setSearching(false);
    setFilteredAlarms(alarms);
  };

  useEffect(() => {
    fetchAlarms();
  }, []);

  useEffect(() => {
    !searching && setFilteredAlarms(alarms);
  }, [searching]);

  useEffect(() => {
    !searching && setFilteredAlarms(alarms);
  }, [alarms]);

  return (
    <AlarmsContext.Provider
      value={{
        alarms,
        filteredAlarms,
        loading,
        searching,
        updateAlarm,
        tooglePause,
        deleteAlarm,
        createAlarm,
        searchAlarm,
        clearSearch,
      }}
    >
      {children}
    </AlarmsContext.Provider>
  );
};

const AlarmsConsumer = AlarmsContext.Consumer;
export { AlarmsProvider, AlarmsConsumer, AlarmsContext };
