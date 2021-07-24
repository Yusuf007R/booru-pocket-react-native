import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {StatusBar} from 'react-native';
import Animated from 'react-native-reanimated';
import ParamsContextProvider from './src/contexts/paramsContext/provider';
import SettingsContextProvider from './src/contexts/settingsContext/provider';
import ThemeModeProvider from './src/theme/themeProvider';
import Navigation from './src/router';

export const ScrollValueContext = React.createContext(new Animated.Value(0));

function App() {
  return (
    <SafeAreaProvider>
      <StatusBar translucent backgroundColor="rgba(0,0,0,0.3)" />
      <SettingsContextProvider>
        <ThemeModeProvider>
          <ParamsContextProvider>
            <ScrollValueContext.Provider value={new Animated.Value(0)}>
              <Navigation />
            </ScrollValueContext.Provider>
          </ParamsContextProvider>
        </ThemeModeProvider>
      </SettingsContextProvider>
    </SafeAreaProvider>
  );
}

export default App;
