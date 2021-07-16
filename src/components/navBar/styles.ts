import styled from 'styled-components/native';
import Animated from 'react-native-reanimated';
import {StatusBar} from 'react-native';

type HeaderProp = {
  headerHeight: number;
};
type StyledTouchableProps = {
  marginLeft?: number;
  marginRight?: number;
};

export const InputView = styled.View`
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
  z-index: 10000;
  align-items: center;
  justify-content: center;
  padding-top: ${StatusBar.currentHeight}px;
`;

export const StyledTouchable = styled.TouchableOpacity<StyledTouchableProps>`
  width: 30px;
  height: 45px;
  justify-content: center;
  align-content: center;
  margin-left: ${props => props.marginLeft || 0}px;
  margin-right: ${props => props.marginRight || 0}px;
`;

export const ListView = styled.View<HeaderProp>`
  width: 90%;
  position: absolute;
  top: ${props => props.headerHeight}px;
  left: 20px;
  right: 20px;
  z-index: 1000;
`;

export const StyledInput = styled.TextInput`
  /* margin-left: 5px; */
  flex: 1;
`;

export const Container = styled.View`
  flex: 1;
`;

export const ItemContainer = styled.View`
  background-color: ${({theme}) => theme.secBackground};
  height: 40px;
`;
