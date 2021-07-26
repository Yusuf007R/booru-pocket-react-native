import styled from 'styled-components/native';

export const ProfileItemContainer = styled.TouchableOpacity`
  flex-direction: column;
  height: 60px;
  width: 80px;
  justify-content: center;
  align-items: center;
`;

export const StyledText = styled.Text`
  color: ${({theme}) => theme.textColor};
  font-size: 13px;
`;
