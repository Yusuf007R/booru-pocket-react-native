import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${props => props.theme.background};
`;

export const OptionContainer = styled.View`
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  width: 98%;
`;

export const TextContainer = styled.View`
  width: 100%;
`;

export const StyledText = styled.Text`
  color: ${props => props.theme.textColor};
`;
