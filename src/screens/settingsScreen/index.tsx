import React, {useContext, useRef, useState} from 'react';
import {OptionContainer, StyledText} from './styles';
import {Switch, TouchableHighlight, View} from 'react-native';
import {
  SettingsActions,
  SettingsContext,
} from '../../contexts/settingsContext/context';
import {DefaultTheme, ThemeContext} from 'styled-components/native';
import {Container} from '../../components/Containers';

const SwitchComponent = (props: {
  theme: DefaultTheme;
  value: boolean;
  dispatcher: React.Dispatch<SettingsActions>;
  payload: SettingsActions;
}) => {
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
function SettingsScreen() {
  const {settings, settingsDispatch} = useContext(SettingsContext);
  const themeContext = useContext(ThemeContext);
  const [valueSS, setValueSS] = useState('');
  const onChangeSS = (value: string) => {
    setValueSS(value);
  };
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
      <OptionContainer>
        <StyledText>Toggle Safe Mode</StyledText>
        <SwitchComponent
          theme={themeContext}
          value={settings.safe}
          dispatcher={settingsDispatch}
          payload={{type: 'toggleSafeMode'}}
        />
      </OptionContainer>
      <OptionContainer>
        <StyledText>Toggle Theme</StyledText>
      </OptionContainer>
    </Container>
  );
}

export default SettingsScreen;
