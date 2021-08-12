import React from 'react';
import {useContext} from 'react';
import {ThemeContext} from 'styled-components/native';
import {IconContainer, StyledText} from './styles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {OptionType} from '../../PopularNavBar';

type Props = {
  name: string;
  onPress: (type: OptionType) => void;
  optionType: OptionType;
};

export default function PopularIcon({name, onPress, optionType}: Props) {
  const theme = useContext(ThemeContext);
  return (
    <IconContainer>
      <Ionicons.Button
        onPress={() => onPress(optionType)}
        color={theme.iconColor}
        name={name}
        backgroundColor={'transparent'}>
        <StyledText>{optionType}</StyledText>
      </Ionicons.Button>
    </IconContainer>
  );
}
