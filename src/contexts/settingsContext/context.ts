import React from 'react';

export type SettingsType = {
  safe: boolean;
  quality: boolean;
  darkTheme: boolean;
  column: number;
  limit: number;
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
  | {type: 'setColumn'; payload: number}
  | {type: 'loadSettings'; payload: SettingsType};

export const defaultSettings: SettingsType = {
  safe: true,
  quality: true,
  darkTheme: false,
  column: 2,
  limit: 50,
};

const initialState: settingsContext = {
  settings: defaultSettings,
  settingsDispatch: () => undefined,
};

export const SettingsContext =
  React.createContext<settingsContext>(initialState);
