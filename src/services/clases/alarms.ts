import { ALARMS } from '../../data/alarms';
import { v4 as uuid } from 'uuid';
import { Alarm } from '../../models/alarms'

export const fakeFetchAlarms = (value: Alarm[], time: number): Promise<Alarm[]> => new Promise(resolve => setTimeout(resolve, time, value));

export default class AlarmsService {
  static async getList() {
    const alarmsList = await fakeFetchAlarms(ALARMS, 2000);

    return alarmsList;
  }

  static async createAlarm(alarms: Alarm[], alarm: Alarm) {
    const id = uuid();
    const newAlarm = {...alarm, id};
    const alarmsList = await fakeFetchAlarms([newAlarm, ...alarms], 2000);

    return alarmsList;
  }

  static async updateAlarm(alarms: Alarm[], alarm: Alarm) {
    const updatedAlarms = alarms.map(item => {
      return item.id === alarm.id ? { ...item, ...alarm } : item
    })
    const alarmsList = await fakeFetchAlarms(updatedAlarms, 500)

    return alarmsList;
  }

  static async deleteAlarm(alarms: Alarm[], alarm: Alarm) {
    const alarmToDelete = alarms.find((item) => item.id === alarm.id);
    const updatedAlarms = alarms.filter((item) => item.id !== alarmToDelete?.id);
    const alarmsList = fakeFetchAlarms(alarmToDelete ? updatedAlarms : alarms, 500)

    return alarmsList;
  }
}