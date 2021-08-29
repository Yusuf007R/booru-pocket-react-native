import styled from 'styled-components/native';

export const RowContainer = styled.View`
  flex-direction: row;
`;

export const StyledText = styled.Text`
  margin-top: 11px;
  font-size: 16px;
  font-style: italic;
  color: ${({theme}) => theme.lightIconColor};
`;
