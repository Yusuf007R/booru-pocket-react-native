import styled from 'styled-components/native';

type StyledTouchableProps = {
  marginLeft?: number;
  marginRight?: number;
};

export const StyledTouchable = styled.TouchableOpacity<StyledTouchableProps>`
  width: 30px;
  height: 45px;
  justify-content: center;
  align-content: center;
  margin-left: ${props => props.marginLeft || 0}px;
  margin-right: ${props => props.marginRight || 0}px;
`;
