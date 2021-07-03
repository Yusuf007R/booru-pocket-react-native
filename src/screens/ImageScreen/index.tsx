import React, {useCallback, useEffect, useState} from 'react';
import {Dimensions, ActivityIndicator} from 'react-native';
import {StyledImg, Container} from './styles';

import VideoPlayer from 'react-native-video-controls';
import FastImage from 'react-native-fast-image';
import ImageViewer from 'react-native-image-zoom-viewer';

export default function ImageScreen(props) {
  const [rerender, setRerender] = useState(1);
  const {video, highQuality, lowQuality} = props.route.params;

  useEffect(() => {
    if (video) {
      return;
    }
    function reRender() {
      setRerender(prev => prev + 1);
    }

    Dimensions.addEventListener('change', reRender);
    return () => {
      Dimensions.removeEventListener('change', reRender);
    };
  }, []);

  const memoizedLoading = useCallback(
    () => <ActivityIndicator size="large" color="#C2185B" />,
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
