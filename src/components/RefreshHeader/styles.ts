import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  flex-direction: row;
`;

export const TextContainer = styled.View`
  margin-left: 20px;
`;

export const StyledText = styled.Text`
  margin: 5px 0px 5px 0px;
  font-size: 15px;
  color: ${({theme}) => theme.textColor};
  text-align: center;
  width: 140px;
`;
