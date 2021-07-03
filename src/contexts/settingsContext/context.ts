import React from 'react';

export type SettingsType = {
  safe: boolean;
  quality: boolean;
  darkTheme: boolean;
  column: number;
};
export type settingsContext = {
  settings: SettingsType;
  settingsDispatch: React.Dispatch<Actions>;
};

export type Actions =
  | {type: 'toggleQuality'}
  | {type: 'resetPage'}
  | {type: 'toggleSafeMode'}
  | {type: 'toggleDarkTheme'}
  | {type: 'setColumn'; payload: number};

const initialState: settingsContext = {
  settings: {safe: false, quality: true, darkTheme: false, column: 2},
  settingsDispatch: () => undefined,
};

export const SettingsContext =
  React.createContext<settingsContext>(initialState);
