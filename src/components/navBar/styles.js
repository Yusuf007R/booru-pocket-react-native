import styled from 'styled-components/native';
import Animated from 'react-native-reanimated';
import {StatusBar} from 'react-native';

export const StyledView = styled.View`
  height: 45px;
  width: 95%;
  background-color: #525e5b;
  border-radius: 8px;
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
