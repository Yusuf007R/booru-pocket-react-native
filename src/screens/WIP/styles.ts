import styled from 'styled-components/native';

export const Container = styled.View`
  background-color: ${({theme}) => theme.background};
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const StyledText = styled.Text`
  font-size: 25px;
  color: ${({theme}) => theme.textColor};
`;
