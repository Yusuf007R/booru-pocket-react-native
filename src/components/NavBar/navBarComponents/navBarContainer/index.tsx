import React from 'react';
import Animated, {interpolateNode} from 'react-native-reanimated';
import {NavContainer, StyledAnimated} from './styles';

type Props = {
  children: React.ReactNode;
  headerHeight: number;
  toggleAnimation: boolean;
  scrollY: Animated.Value<0>;
};

export default function NavBarContainer({
  children,
  headerHeight,
  toggleAnimation,
  scrollY,
}: Props) {
  const diffClamp = Animated.diffClamp(scrollY, 0, headerHeight);
  const translateY = interpolateNode(diffClamp, {
    inputRange: [0, headerHeight],
    outputRange: [0, -headerHeight],
  });

  return (
    <StyledAnimated
      headerHeight={headerHeight}
      style={{
        transform: [{translateY: toggleAnimation ? translateY : 0}],
      }}>
      <NavContainer>{children}</NavContainer>
    </StyledAnimated>
  );
}
