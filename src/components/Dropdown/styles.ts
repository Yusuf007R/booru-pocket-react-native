import styled from 'styled-components/native';

export const OptionModal = styled.View`
  background-color: ${({theme}) => theme.thirdBackground};
  padding: 8px 50px 5px 10px;
`;

export const IconContainer = styled.TouchableOpacity`
  flex-direction: row;
  height: 38px;
`;

export const StyledText = styled.Text`
  color: ${({theme}) => theme.textColor};
  width: 100%;
  text-transform: capitalize;
  font-size: 18px;
  margin-left: 5px;
`;
