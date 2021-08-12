import styled from 'styled-components/native';

type HeaderProp = {
  headerHeight: number;
};

export const ListView = styled.View<HeaderProp>`
  width: 90%;
  position: absolute;
  top: ${props => props.headerHeight}px;
  left: 20px;
  right: 20px;
  z-index: 1000;
`;

export const StyledInput = styled.TextInput`
  flex: 1;
`;

export const ItemContainer = styled.View`
  background-color: ${({theme}) => theme.secBackground};
  height: 40px;
`;
