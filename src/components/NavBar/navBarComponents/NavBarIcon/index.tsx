import React from 'react';
import {GestureResponderEvent} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {StyledTouchable} from './styles';

type Props = {
  name: string;
  onPress: (e?: GestureResponderEvent) => void;
  margin: number;
  size: number;
};
export default function NavbarIcon({name, onPress, margin, size}: Props) {
  return (
    <StyledTouchable marginLeft={margin} onPress={onPress}>
      <Ionicons size={size} name={name} />
    </StyledTouchable>
  );
}
