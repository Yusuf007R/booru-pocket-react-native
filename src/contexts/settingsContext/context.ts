import React from 'react';

export type themeType = 'dark' | 'light' | 'system';

export type SettingsType = {
  safe: boolean;
  quality: boolean;
  theme: themeType;
  column: number;
  limit: number;
};

export type settingsContextType = {
  settings: SettingsType;
  settingsDispatch: React.Dispatch<SettingsActions>;
};

export type SettingsActions =
  | {type: 'toggleQuality'}
  | {type: 'resetPage'}
  | {type: 'toggleSafeMode'}
  | {type: 'changeTheme'}
  | {type: 'setColumn'; payload: number}
  | {type: 'loadSettings'; payload: SettingsType};

export const defaultSettings: SettingsType = {
  safe: true,
  quality: true,
  theme: 'system',
  column: 2,
  limit: 50,
};

const initialState: settingsContextType = {
  settings: defaultSettings,
  settingsDispatch: () => undefined,
};

export const SettingsContext =
  React.createContext<settingsContextType>(initialState);
