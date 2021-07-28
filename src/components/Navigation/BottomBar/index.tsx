import {
  BottomTabBar,
  BottomTabBarOptions,
  BottomTabBarProps,
} from '@react-navigation/bottom-tabs';
import React from 'react';
import Animated from 'react-native-reanimated';
import {StyledAnimated} from './styles';

function BottomBar({
  bottomBarProps,
  translateY,
}: {
  bottomBarProps: BottomTabBarProps<BottomTabBarOptions>;
  translateY: Animated.Node<number>;
}) {
  return (
    <StyledAnimated style={{transform: [{translateY}]}}>
      <BottomTabBar {...bottomBarProps} />
    </StyledAnimated>
  );
}

export default BottomBar;
