import React, {useEffect, useState} from 'react';
import {Dimensions} from 'react-native';
import {StyledImg, StyledImgZoom} from './styles';
import VideoPlayer from 'react-native-video-controls';
import FastImage from 'react-native-fast-image';

export default function ImageScreen({route}) {
  const [rerender, setRerender] = useState(1);
  const {video, highQuality, lowQuality} = route.params;
  useEffect(() => {
    if (video) {
      return;
    }
    function reRender() {
      setRerender((prev) => prev + 1);
    }

    Dimensions.addEventListener('change', reRender);
    return () => {
      Dimensions.removeEventListener('change', reRender);
    };
  }, []);

  return (
    <>
      {video ? (
        <VideoPlayer
          source={{
            uri: highQuality,
          }}
        />
      ) : (
        <StyledImgZoom
          cropWidth={Dimensions.get('window').width}
          cropHeight={Dimensions.get('window').height}
          imageWidth={Dimensions.get('window').width}
          imageHeight={Dimensions.get('window').height}>
          <StyledImg
            resizeMode={FastImage.resizeMode.contain}
            source={{uri: highQuality}}
          />
        </StyledImgZoom>
      )}
    </>
  );
}
