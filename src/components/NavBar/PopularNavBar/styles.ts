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

export const OptionModal = styled.View`
  position: absolute;
  background-color: ${({theme}) => theme.background};
  width: 160px;
  height: 115px;
  z-index: 10;
  top: 100px;
  right: -10px;
  border-radius: 8px;
  padding-left: 2px;
`;
