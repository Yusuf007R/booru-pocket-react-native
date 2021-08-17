import styled from 'styled-components/native';

export const LoadingContainer = styled.View`
  position: absolute;
  z-index: 100;
  align-self: center;
  top: 120px;
  background-color: ${({theme}) => theme.background};
  border-radius: 50px;
`;
