import styled from 'styled-components/native';

export const IconContainer = styled.View`
  justify-content: center;
  align-items: center;
  width: 80px;
`;

interface LabelProps {
  focus: boolean;
}

export const Label = styled.Text<LabelProps>`
  font-size: 10px;
  color: ${({focus, theme}) => (focus ? theme.main : theme.textColor)};
`;
