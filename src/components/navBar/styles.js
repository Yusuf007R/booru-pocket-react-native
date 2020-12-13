import styled from 'styled-components/native';
import Animated from 'react-native-reanimated';
import {StatusBar} from 'react-native';

export const InputView = styled.View`
  height: 45px;
  width: 95%;
  background-color: #525e5b;
  border-radius: 8px;
  flex-direction: row;
`;

export const StyledAnimated = styled(Animated.View)`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  height: ${(props) => props.headerHeight}px;
  z-index: 10000;
  align-items: center;
  justify-content: center;
  padding-top: ${StatusBar.currentHeight}px;
`;

export const StyledTouchable = styled.TouchableOpacity`
  width: 30px;
  height: 30px;
  position: absolute;
  right: 0px;
  top: 7px;
  flex: 1;
  justify-content: center;
  align-content: center;
`;

export const ListView = styled.View`
  width: 90%;
  position: absolute;
  top: ${(props) => props.headerHeight}px;
  left: 20px;
  right: 20px;
  z-index: 1000;
`;

export const StyledInput = styled.TextInput`
  margin-left: 5px;
  width: 100%;
`;

export const RowView = styled.View`
  height: 45px;
  align-items: center;
  flex-direction: row;
`;
