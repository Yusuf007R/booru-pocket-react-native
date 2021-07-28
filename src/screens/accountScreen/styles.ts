import styled from 'styled-components/native';

type LabelProps = {
  size: number;
};

export const Container = styled.View`
  flex: 1;
  background-color: ${props => props.theme.background};
`;

export const Label = styled.Text<LabelProps>`
  color: ${({theme}) => theme.textColor};
  font-size: ${({size}) => size}px;
`;

export const Head = styled.View`
  width: 100%;
  height: 35%;
  justify-content: center;
  align-items: center;
  padding-top: 60px;
`;

export const Body = styled.View`
  width: 100%;
  height: 65%;
  align-items: center;
`;

export const StyledInput = styled.TextInput`
  background-color: ${({theme}) => theme.secBackground};
  width: 85%;
  height: 50px;
  border-radius: 15px;
`;

export const LabelContainer = styled.View`
  width: 85%;
  margin: 8px;
  align-items: flex-start;
`;

export const StyledButton = styled.TouchableOpacity`
  margin-top: 20px;
  width: 85%;
  background-color: ${({theme}) => theme.main};
  height: 50px;
  border-radius: 15px;
  justify-content: center;
  align-items: center;
`;

export const ProfileItemContainer = styled.View`
  flex-direction: row;
  justify-content: space-around;
  width: 85%;
  height: 70%;
  margin-top: 60px;
`;

export const LogoutToucheable = styled.TouchableOpacity`
  margin-right: 15px;
`;
