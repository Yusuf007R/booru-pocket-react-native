import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: ${({theme}) => theme.background};
`;
export const TitleContainer = styled.View`
  flex-direction: row;
  align-items: center;
  min-height: 90px;
`;

export const Title = styled.Text`
  color: ${({theme}) => theme.textColor};
  font-size: 20px;
  margin-left: 15px;
  margin-top: 30px;
  font-weight: bold;
  font-style: italic;
`;
export const HeadContainer = styled.View`
  min-height: 90px;
`;

export const BodyContainer = styled.View`
  justify-content: space-between;
  flex: 1;
`;

export const TopContent = styled.ScrollView`
  padding-top: 15px;
  width: 100%;
  padding-left: 15px;
`;

export const BottomContent = styled.View`
  min-height: 145px;
  padding-top: 15px;
  width: 100%;
  padding-left: 15px;
`;
