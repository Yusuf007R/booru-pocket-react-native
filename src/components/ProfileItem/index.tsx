import React, {Fragment, useContext} from 'react';
import {ThemeContext} from 'styled-components';
import {ProfileItemContainer, StyledText} from './styles';
import Ionicons from 'react-native-vector-icons/Ionicons';

type props = {
  text: string;
  iconName: string;
  onPress: () => void;
};

function ProfileIcons({text, iconName, onPress}: props) {
  const themeContext = useContext(ThemeContext);
  return (
    <ProfileItemContainer onPress={onPress}>
      <Fragment>
        <Ionicons name={iconName} size={45} color={themeContext.iconColor} />
        <StyledText>{text}</StyledText>
      </Fragment>
    </ProfileItemContainer>
  );
}

export default ProfileIcons;
