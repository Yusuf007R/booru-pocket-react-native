import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {StyledTouchable} from './styles';

type Props = {
  name: string;
  onPress: () => void;
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
