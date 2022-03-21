import * as React from 'react';
import { v4 as uuid } from 'uuid';

const AlarmsContext = React.createContext()

export const ALARMS = [
  {
    id: '49fe09ae-4207-478e-b419-5d7dd875f561',
    name: 'asdf',
    source: 'asd',
    metric: 'asd',
    trigger: 'asd',
    paused: false,
    active: true
  }
];

export const TYPES = {
  ADD_ALARM: "ADD_ALARM",
  REMOVE_ALARM: "REMOVE_ALARM",
  UPDATE_ALARM: "UPDATE_ALARM",
};

function AlarmsReducer(state, action) {
  switch (action.type) {
    case TYPES.ADD_ALARM: {
      return {
        ...state,
        alarms: [...state.alarms, { ...action.payload, id: uuid()}],
      };
    }
    case TYPES.REMOVE_ALARM: {
      const alarmToDelete = state.alarms.find((item) => item.id === action.payload.id);
      const updatedState = {
        ...state,
        alarms: state.alarms.filter((item) => item.id !== action.payload),
      }

      return !!alarmToDelete ? updatedState : state;
    }
    case TYPES.UPDATE_ALARM: {
      const updatedAlarms = state.alarms.map(item => {
          return item.id === action.payload.id ? { ...item, ...action.payload } : item
        
      })

      return {
        ...state,
        alarms: updatedAlarms,
      };
    }
    default:
      return state;
  }
}

function AlarmsProvider({children}) {
  const [state, dispatch] = React.useReducer(AlarmsReducer, { alarms: ALARMS })

  const value = {state, dispatch}
  return <AlarmsContext.Provider value={value}>{children}</AlarmsContext.Provider>
}

function useAlarms() {
  const context = React.useContext(AlarmsContext)
  if (context === undefined) {
    throw new Error('useAlarms must be used within a Provider')
  }
  return context
}


export { AlarmsProvider, useAlarms }