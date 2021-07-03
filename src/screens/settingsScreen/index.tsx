import React, {useContext} from 'react';
import {Container, OptionContainer, StyledText} from './styles';
import {Switch} from 'react-native';
import {SettingsContext} from '../../contexts/settingsContext/context';
import {ThemeContext} from 'styled-components/native';
import {Divider} from '../../components/Divider';

const SwitchComponent = props => {
  return (
    <Switch
      trackColor={{false: '#949494', true: props.theme.main}}
      thumbColor={props.value ? props.theme.main : '#f4f3f4'}
      ios_backgroundColor="#3e3e3e"
      onValueChange={() => props.dispatcher(props.payload)}
      {...props}
    />
  );
};
function SettingsScreen(props) {
  const {settings, settingsDispatch} = useContext(SettingsContext);
  const themeContext = useContext(ThemeContext);

  return (
    <Container>
      <OptionContainer>
        <StyledText>Toggle Quality Of Preview Image</StyledText>
        <SwitchComponent
          theme={themeContext}
          value={settings.quality}
          dispatcher={settingsDispatch}
          payload={{type: 'toggleQuality'}}
        />
      </OptionContainer>
      {/* <Divider /> */}
      <OptionContainer>
        <StyledText>Toggle Safe Mode</StyledText>
        <SwitchComponent
          theme={themeContext}
          value={settings.safe}
          dispatcher={settingsDispatch}
          payload={{type: 'toggleSafeMode'}}
        />
      </OptionContainer>
      {/* <Divider /> */}
      <OptionContainer>
        <StyledText>Toggle Theme</StyledText>
        <SwitchComponent
          theme={themeContext}
          value={settings.darkTheme}
          dispatcher={settingsDispatch}
          payload={{type: 'toggleDarkTheme'}}
        />
      </OptionContainer>
      {/* <Divider /> */}
    </Container>
  );
}

export default SettingsScreen;
