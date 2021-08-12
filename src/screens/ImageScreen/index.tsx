import React, {useCallback} from 'react';
import {ActivityIndicator} from 'react-native';
import {StyledImg} from './styles';
import {Container} from '../../components/Containers';
import VideoPlayer from 'react-native-video-controls';
import FastImage from 'react-native-fast-image';
import ImageViewer from 'react-native-image-zoom-viewer';
import {StackTypes} from '../../router';
import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {useContext} from 'react';
import {ThemeContext} from 'styled-components/native';

type Props = {
  navigation: StackNavigationProp<StackTypes>;
  route: RouteProp<StackTypes, 'IMG'>;
};

export default function ImageScreen(props: Props) {
  const theme = useContext(ThemeContext);
  const {video, highQuality} = props.route.params;

  const memoizedLoading = useCallback(
    () => <ActivityIndicator size="large" color={theme.main} />,
    [],
  );

  const memoizedImage = useCallback(
    ({source: {uri}}) => (
      <StyledImg resizeMode={FastImage.resizeMode.center} source={{uri}} />
    ),
    [],
  );

  return (
    <Container>
      {video ? (
        <VideoPlayer
          navigator={props.navigation}
          source={{
            uri: highQuality,
          }}
        />
      ) : (
        <ImageViewer
          renderIndicator={() => <></>}
          maxOverflow={0}
          loadingRender={memoizedLoading}
          imageUrls={[{url: highQuality}]}
          renderImage={memoizedImage}
        />
      )}
    </Container>
  );
}
