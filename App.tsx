import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import GalleryScreen from './src/screens/galleryScreen';
import ImageScreen from './src/screens/ImageScreen';
import {StatusBar} from 'react-native';
import ParamsContextProvider from './src/contexts/paramsContext/provider';

const Stack = createStackNavigator();

function App() {
  return (
    <SafeAreaProvider>
      <StatusBar translucent backgroundColor="rgba(0,0,0,0.3)" />
      <ParamsContextProvider>
        <NavigationContainer>
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
        </NavigationContainer>
      </ParamsContextProvider>
    </SafeAreaProvider>
  );
}

export default App;
