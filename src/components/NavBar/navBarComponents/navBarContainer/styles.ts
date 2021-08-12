import {StatusBar} from 'react-native';
import Animated from 'react-native-reanimated';
import styled from 'styled-components/native';

type HeaderProp = {
  headerHeight: number;
};

export const NavContainer = styled.View`
  height: 45px;
  width: 95%;
  background-color: ${props => props.theme.secBackground};
  border-radius: 8px;
  flex-direction: row;
  justify-content: space-between;
`;

export const StyledAnimated = styled(Animated.View)<HeaderProp>`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  height: ${props => props.headerHeight}px;
  z-index: 1;
  align-items: center;
  justify-content: center;
  padding-top: ${StatusBar.currentHeight}px;
`;
