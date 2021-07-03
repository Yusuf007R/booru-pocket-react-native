import React, {useReducer} from 'react';
import {SettingsContext} from './context';
import {reducer} from './reducer';

const SettingsContextProvider: React.FC = ({children}) => {
  const [settings, settingsDispatch] = useReducer(reducer, {
    safe: true,
    quality: true,
    darkTheme: false,
    column: 2,
  });

  return (
    <SettingsContext.Provider value={{settings, settingsDispatch}}>
      {children}
    </SettingsContext.Provider>
  );
};

export default SettingsContextProvider;
