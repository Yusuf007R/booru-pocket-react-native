import styled from 'styled-components/native';

export const DrawerItemContainer = styled.TouchableOpacity`
  flex-direction: row;
  height: 45px;
`;

export const StyledText = styled.Text`
  color: ${({theme}) => theme.textColor};
  margin-left: 25px;
  font-size: 14px;
  margin-top: 3px;
`;
