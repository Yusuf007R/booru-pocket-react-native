import React from 'react';
import {StatusBar} from 'react-native';
import Animated from 'react-native-reanimated';
import SettingsContextProvider from './src/contexts/settingsContext/provider';
import ThemeModeProvider from './src/theme/themeProvider';
import Navigation from './src/router';
import UserContextProvider from './src/contexts/userContext/provider';

if (__DEV__) {
  import('./ReactotronConfig').then(() => console.log('Reactotron Configured'));
}

export const ScrollValueContext = React.createContext(new Animated.Value(0));

function App() {
  return (
    <SettingsContextProvider>
      <UserContextProvider>
        <StatusBar translucent backgroundColor="rgba(0,0,0,0.3)" />
        <ThemeModeProvider>
          <ScrollValueContext.Provider value={new Animated.Value(0)}>
            <Navigation />
          </ScrollValueContext.Provider>
        </ThemeModeProvider>
      </UserContextProvider>
    </SettingsContextProvider>
  );
}

export default App;
