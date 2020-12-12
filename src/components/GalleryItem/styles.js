import styled from 'styled-components/native';
import {Dimensions} from 'react-native';
import FastImage from 'react-native-fast-image';

export const StyledImg = styled(FastImage)`
  width: 100%;
  height: ${Dimensions.get('window').width / 2}px;
`;

export const StyledTouchableOpacity = styled.TouchableOpacity`
  flex: 1;
`;
