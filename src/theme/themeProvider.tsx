import React from 'react';
import {useContext} from 'react';
import {ThemeProvider} from 'styled-components';
import {SettingsContext} from '../contexts/settingsContext/context';
import {darkTheme, lightTheme} from './themes';

const ThemeModeProvider: React.FC = ({children}) => {
  const {settings} = useContext(SettingsContext);

  return (
    <ThemeProvider theme={settings.darkTheme ? lightTheme : darkTheme}>
      {children}
    </ThemeProvider>
  );
};

export default ThemeModeProvider;
