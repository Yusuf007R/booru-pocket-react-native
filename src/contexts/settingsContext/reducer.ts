import {Actions, SettingsType} from './context';

export const reducer = (state: SettingsType, action: Actions): SettingsType => {
  switch (action.type) {
    case 'toggleQuality':
      return {...state, quality: !state.quality};
    case 'toggleSafeMode':
      return {...state, safe: !state.safe};
    case 'toggleDarkTheme':
      return {...state, darkTheme: !state.darkTheme};
    case 'setColumn':
      return {...state, column: action.payload};
    default:
      return state;
  }
};
