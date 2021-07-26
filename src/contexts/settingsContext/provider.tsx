import React, {useEffect, useReducer} from 'react';
import {defaultSettings, SettingsContext, SettingsType} from './context';
import {reducer} from './reducer';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SettingsContextProvider: React.FC = ({children}) => {
  const [settings, settingsDispatch] = useReducer(reducer, undefined!);

  useEffect(() => {
    (async () => {
      const data = await AsyncStorage.getItem('settings');
      const dataObject: SettingsType = JSON.parse(data!);
      settingsDispatch({
        type: 'loadSettings',
        payload: dataObject ? dataObject : defaultSettings,
      });
    })();
  }, []);

  useEffect(() => {
    if (settings) {
      AsyncStorage.setItem('settings', JSON.stringify(settings));
    }
  }, [settings]);

  return (
    <SettingsContext.Provider value={{settings, settingsDispatch}}>
      {settings && children}
    </SettingsContext.Provider>
  );
};

export default SettingsContextProvider;
