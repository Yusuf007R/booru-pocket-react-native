import React, {Fragment, useContext} from 'react';
import {DrawerItemContainer, StyledText} from './styles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {ThemeContext} from 'styled-components/native';

type props = {
  text: string;
  iconName: string;
  onPress: () => void;
};

function DrawerItem({text, iconName, onPress}: props) {
  const themeContext = useContext(ThemeContext);
  return (
    <DrawerItemContainer onPress={onPress}>
      <Fragment>
        <Ionicons name={iconName} size={25} color={themeContext.iconColor} />
        <StyledText>{text}</StyledText>
      </Fragment>
    </DrawerItemContainer>
  );
}

export default DrawerItem;
