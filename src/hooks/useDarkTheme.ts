import {useState} from 'react';

export const useDarkTheme = () => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    theme === 'light' ? setTheme('dark') : setTheme('light');
  };

  return {theme, toggleTheme};
};
