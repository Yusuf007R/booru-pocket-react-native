import styled from 'styled-components/native';
import Animated from 'react-native-reanimated';
import {StatusBar} from 'react-native';

export const StyledImg = styled.Image`
  width: 100%;
  height: 200px;
`;

export const StyledTouchableOpacity = styled.TouchableOpacity`
  flex: 1;
`;

export const StyledAnimated = styled(Animated.View)`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  height: ${(props) => props.HeaderHeight}px;
  z-index: 10000;
  align-items: center;
  justify-content: center;
  padding-top: ${StatusBar.currentHeight}px;
`;
