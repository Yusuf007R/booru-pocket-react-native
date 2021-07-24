import React, {useContext} from 'react';
import {IconContainer, Label} from './styles';
import {ThemeContext} from 'styled-components';
import Ionicons from 'react-native-vector-icons/Ionicons';

type props = {
  name: string;
  icon: string;
  focus: boolean;
};

function BottomBarIcon({icon, focus, name}: props) {
  const themeContext = useContext(ThemeContext);

  return (
    <IconContainer>
      <Ionicons
        name={icon}
        size={23}
        color={focus ? themeContext.main : themeContext.iconBarColor}
      />
      <Label focus={focus}>{name} </Label>
    </IconContainer>
  );
}

export default BottomBarIcon;
