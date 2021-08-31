import React, {Fragment, useContext} from 'react';
import {IconContainer, StyledText, OptionModal} from './styles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {ThemeContext} from 'styled-components/native';

type DropdownProps = {
  options: string[];
  onPress: (x?: any) => void;
  icons?: string[];
};

export default function Dropdown({options, icons, onPress}: DropdownProps) {
  return (
    <OptionModal>
      {options.map((elem, i) => (
        <OptionElem
          key={`${elem}-${i}`}
          value={elem}
          onPress={onPress}
          icon={icons && icons[i]}
        />
      ))}
    </OptionModal>
  );
}

type OptionProps = {
  icon?: string;
  onPress: (type: any) => void;
  value: string;
};

function OptionElem({icon, onPress, value}: OptionProps) {
  const theme = useContext(ThemeContext);
  return (
    <IconContainer onPress={() => onPress(value)}>
      <Fragment>
        {icon && <Ionicons size={23} color={theme.iconColor} name={icon} />}
        <StyledText>{value}</StyledText>
      </Fragment>
    </IconContainer>
  );
}
