import styled from 'styled-components/native';
import FastImage from 'react-native-fast-image';
import ImageZoom from 'react-native-image-pan-zoom';

export const StyledImg = styled(FastImage)`
  width: 100%;
  height: 100%;
`;

export const StyledImgZoom = styled(ImageZoom)`
  flex: 1;
  height: 100%;
  width: 100%;
`;
