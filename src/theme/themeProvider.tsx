import React from 'react';
import {useContext} from 'react';
import {DefaultTheme, ThemeProvider} from 'styled-components';
import {SettingsContext} from '../contexts/settingsContext/context';

const ThemeModeProvider: React.FC = ({children}) => {
  const {settings} = useContext(SettingsContext);

  const darkTheme: DefaultTheme = {
    main: '#eb638c',
    background: '#0a2b3f',
    secBackground: '#8a98a8 ',
    textColor: '#ebebeb',
  };

  const lightTheme: DefaultTheme = {
    main: '#eb638c',
    background: '#bec3c7',
    secBackground: '#8a98a8 ',
    textColor: '#111111',
  };

  return (
    <ThemeProvider theme={settings.darkTheme ? lightTheme : darkTheme}>
      {children}
    </ThemeProvider>
  );
};

export default ThemeModeProvider;
