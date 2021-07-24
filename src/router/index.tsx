import React, {useContext, useEffect, useState} from 'react';
import {
  createStackNavigator,
  HeaderBackButton,
  StackNavigationProp,
} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import galleryScreen from '../screens/galleryScreen';
import ImageScreen from '../screens/ImageScreen';
import SettingsScreen from '../screens/settingsScreen';
import {ThemeContext} from 'styled-components';
import DrawerContent from '../components/Navigation/DrawerContent';
import {
  createBottomTabNavigator,
  BottomTabBar,
} from '@react-navigation/bottom-tabs';

import BottomBarIcon from '../components/Navigation/BottomBarIcon';
import {ScrollValueContext} from '../../App';
import Animated from 'react-native-reanimated';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

function Navigation() {
  const themeContext = useContext(ThemeContext);
  const scrollY = useContext(ScrollValueContext);
  const diffClamp = Animated.diffClamp(scrollY, 0, 70);
  const translateY = Animated.interpolate(diffClamp, {
    inputRange: [0, 70],
    outputRange: [0, 70],
  });

  const options = ({navigation}: {navigation: StackNavigationProp<any>}) => ({
    gestureEnabled: false,
    headerStyle: {
      backgroundColor: themeContext.background,
      borderBottomColor: themeContext.textColor,
      borderBottomWidth: 0.5,
    },
    headerTitleStyle: {color: themeContext.textColor},
    headerShown: true,
    headerLeft: () => (
      <HeaderBackButton
        onPress={() => navigation.goBack()}
        tintColor={themeContext.textColor}
      />
    ),
  });

  const DrawerNavigator = () => {
    return (
      <Drawer.Navigator
        backBehavior={'initialRoute'}
        drawerType={'front'}
        // openByDefault
        drawerContent={_ => <DrawerContent />}
        initialRouteName="Gallery">
        <Drawer.Screen name="Gallery" component={BottomBarNavigator} />
      </Drawer.Navigator>
    );
  };

  const BottomBarNavigator = () => {
    return (
      <Tab.Navigator
        tabBar={props => {
          return (
            <Animated.View
              style={{
                transform: [{translateY}],
                position: 'absolute',
                bottom: 0,
                width: '100%',
                height: 65,
              }}>
              <BottomTabBar {...props} />
            </Animated.View>
          );
        }}
        tabBarOptions={{
          showLabel: false,
          style: {
            backgroundColor: themeContext.background,
          },
        }}>
        <Tab.Screen
          name="Posts"
          options={{
            tabBarIcon: ({focused}) => (
              <BottomBarIcon name="Posts" focus={focused} icon={'images'} />
            ),
          }}
          component={galleryScreen}
        />
        <Tab.Screen
          name="Popular"
          options={{
            tabBarIcon: ({focused}) => (
              <BottomBarIcon name="Popular" focus={focused} icon={'flame'} />
            ),
          }}
          component={galleryScreen}
        />
        <Tab.Screen
          options={{
            tabBarIcon: ({focused}) => (
              <BottomBarIcon
                name="Recommended"
                focus={focused}
                icon={'heart-circle'}
              />
            ),
          }}
          name="Recommended"
          component={galleryScreen}
        />
        <Tab.Screen
          options={{
            tabBarIcon: ({focused}) => (
              <BottomBarIcon name="Tags" focus={focused} icon={'pricetag'} />
            ),
          }}
          name="Tags"
          component={galleryScreen}
        />
      </Tab.Navigator>
    );
  };

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={DrawerNavigator}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="IMG"
          component={ImageScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Settings"
          options={options}
          component={SettingsScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigation;
