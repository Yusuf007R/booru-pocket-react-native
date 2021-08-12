import styled from 'styled-components/native';

export const IconContainer = styled.View`
  flex-direction: row;
`;

export const StyledText = styled.Text`
  color: ${({theme}) => theme.textColor};
  width: 100%;
  text-transform: capitalize;
`;
