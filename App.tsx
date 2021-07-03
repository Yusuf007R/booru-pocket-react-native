import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import GalleryScreen from './src/screens/galleryScreen';
import ImageScreen from './src/screens/ImageScreen';
import {StatusBar} from 'react-native';
import ParamsContextProvider from './src/contexts/paramsContext/provider';
import SettingsContextProvider from './src/contexts/settingsContext/provider';
import ThemeModeProvider from './src/theme/themeProvider';
import SettingsScreen from './src/screens/settingsScreen';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const Xdxd = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={GalleryScreen}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="IMG"
        component={ImageScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

function App() {
  return (
    <SafeAreaProvider>
      <StatusBar translucent backgroundColor="rgba(0,0,0,0.3)" />
      <SettingsContextProvider>
        <ThemeModeProvider>
          <ParamsContextProvider>
            <NavigationContainer>
              <Drawer.Navigator
                drawerStyle={{backgroundColor: '#04151F'}}
                initialRouteName="Gallery">
                <Drawer.Screen name="Gallery" component={Xdxd} />
                <Drawer.Screen name="Settings" component={SettingsScreen} />
              </Drawer.Navigator>
            </NavigationContainer>
          </ParamsContextProvider>
        </ThemeModeProvider>
      </SettingsContextProvider>
    </SafeAreaProvider>
  );
}

export default App;
