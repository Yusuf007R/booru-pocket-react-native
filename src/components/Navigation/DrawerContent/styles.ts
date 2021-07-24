import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: ${({theme}) => theme.background};
`;
export const TitleContainer = styled.View`
  flex-direction: row;
  align-items: center;
  height: 90px;
`;

export const Title = styled.Text`
  margin-left: 10px;
  color: ${({theme}) => theme.textColor};
  font-size: 20px;
  margin-left: 15px;
  margin-top: 30px;
  font-weight: bold;
  font-style: italic;
`;
export const HeadContainer = styled.View``;

export const BodyContainer = styled.View`
  flex: 1;
  justify-content: space-between;
`;

export const TopContent = styled.View`
  padding-top: 25px;
  width: 100%;
  height: 78%;
  padding-left: 15px;
`;

export const DrawerItemContainer = styled.View`
  flex-direction: row;
`;

export const BottomContent = styled.View`
  width: 100%;
  height: 18%;
  padding-left: 15px;
`;
