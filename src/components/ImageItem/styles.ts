import styled from 'styled-components/native';
import FastImage from 'react-native-fast-image';
import Video from 'react-native-video';

export const StyledImg = styled(FastImage)`
  flex: 1;
  width: 100%;
  height: 100%;
`;
export const StyledVideo = styled(Video)`
  width: 100%;
  height: 100%;
`;

export const VideoContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const LoadingContainer = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  justify-content: center;
  align-items: center;
  z-index: 500;
  background-color: black;
`;
