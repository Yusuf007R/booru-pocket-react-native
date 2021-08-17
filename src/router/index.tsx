import React, {useContext} from 'react';
import {
  createStackNavigator,
  HeaderBackButton,
  StackNavigationProp,
} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import GalleryScreen from '../screens/GalleryScreen';
import ImageScreen from '../screens/ImageScreen';
import SettingsScreen from '../screens/SettingsScreen';
import AccountScreen from '../screens/AccountScreen';
import {ThemeContext} from 'styled-components';
import DrawerContent from '../components/Navigation/DrawerContent';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import BottomBarIcon from '../components/Navigation/BottomBarIcon';
import {ScrollValueContext} from '../../App';
import Animated from 'react-native-reanimated';
import BottomBar from '../components/Navigation/BottomBar';
import {Data} from '../services/danbooru.types';
import WIP from '../screens/WIP';
import PopularScreen from '../screens/PopularScreen';

export type GalleryTypes = {
  tags: string[];
  type: 'Gallery' | 'Stack';
};

export type StackTypes = {
  Gallery: GalleryTypes;
  Home: undefined;
  Settings: undefined;
  IMG: {
    index: number;
    data: Data[];
  };
  Account: undefined;
};
export type DrawerTypes = {
  HomeGallery: GalleryTypes;
};

export type BottomTypes = {
  Posts: GalleryTypes;
  Popular: GalleryTypes;
  Recommended: undefined;
  Tags: undefined;
};

const Stack = createStackNavigator<StackTypes>();
const Drawer = createDrawerNavigator<DrawerTypes>();
const Tab = createBottomTabNavigator<BottomTypes>();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      backBehavior={'initialRoute'}
      drawerType={'front'}
      drawerContent={_ => <DrawerContent />}
      initialRouteName="HomeGallery">
      <Drawer.Screen name="HomeGallery" component={BottomBarNavigator} />
    </Drawer.Navigator>
  );
};

const BottomBarNavigator = () => {
  const themeContext = useContext(ThemeContext);
  const scrollY = useContext(ScrollValueContext);
  const diffClamp = Animated.diffClamp(scrollY, 0, 70);
  const translateY = Animated.interpolate(diffClamp, {
    inputRange: [0, 70],
    outputRange: [0, 70],
  });
  return (
    <Tab.Navigator
      tabBar={props => {
        return <BottomBar translateY={translateY} bottomBarProps={props} />;
      }}
      tabBarOptions={{
        showLabel: false,
        style: {
          backgroundColor: themeContext.background,
          height: 55,
          borderTopColor: 'transparent',
        },
      }}>
      <Tab.Screen
        initialParams={{type: 'Gallery'}}
        name="Posts"
        options={{
          tabBarIcon: ({focused}) => (
            <BottomBarIcon name="Posts" focus={focused} icon={'images'} />
          ),
        }}
        component={GalleryScreen}
      />
      <Tab.Screen
        name="Popular"
        options={{
          tabBarIcon: ({focused}) => (
            <BottomBarIcon name="Popular" focus={focused} icon={'flame'} />
          ),
        }}
        component={PopularScreen}
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
        component={WIP}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({focused}) => (
            <BottomBarIcon name="Tags" focus={focused} icon={'pricetag'} />
          ),
        }}
        name="Tags"
        component={WIP}
      />
    </Tab.Navigator>
  );
};

function Navigation() {
  const themeContext = useContext(ThemeContext);

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
        <Stack.Screen
          initialParams={{type: 'Stack'}}
          name="Gallery"
          options={{headerShown: false}}
          component={GalleryScreen}
        />
        <Stack.Screen
          name="Account"
          options={options}
          component={AccountScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigation;
