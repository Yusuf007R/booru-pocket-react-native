import React, {useEffect, useState} from 'react';
import {useContext} from 'react';
import {useColorScheme} from 'react-native';
import {ThemeProvider} from 'styled-components';
import {SettingsContext} from '../contexts/settingsContext/context';
import {darkTheme, lightTheme} from './themes';

const ThemeModeProvider: React.FC = ({children}) => {
  const {settings} = useContext(SettingsContext);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const systemTheme = useColorScheme();

  useEffect(() => {
    if (settings.theme === 'system') {
      return setTheme(systemTheme || 'dark');
    }
  }, [systemTheme]);

  useEffect(() => {
    if (settings.theme !== 'system') {
      return setTheme(settings.theme);
    }
  }, [settings.theme]);

  return (
    <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
      {children}
    </ThemeProvider>
  );
};

export default ThemeModeProvider;
