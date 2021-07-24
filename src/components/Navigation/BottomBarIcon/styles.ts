import styled from 'styled-components/native';

export const IconContainer = styled.View`
  justify-content: center;
  align-items: center;
`;

interface LabelProps {
  focus: boolean;
}

export const Label = styled.Text<LabelProps>`
  font-size: 9px;
  color: ${({focus, theme}) => (focus ? theme.main : theme.textColor)};
`;
