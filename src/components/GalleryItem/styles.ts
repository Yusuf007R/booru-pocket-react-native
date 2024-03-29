import styled from 'styled-components/native';
import FastImage from 'react-native-fast-image';

export const StyledImg = styled(FastImage)`
  width: 100%;
  height: 100%;
`;

export const StyledTouchableOpacity = styled.TouchableHighlight`
  flex: 1;
  margin: 3px;
  background-color: ${({theme}) => theme.thirdBackground};
`;
