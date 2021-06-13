import React, {useEffect, useState} from 'react';
import {Dimensions, View} from 'react-native';
import {StyledImg} from './styles';
import ImageZoom from 'react-native-image-pan-zoom';
import VideoPlayer from 'react-native-video-controls';
import FastImage from 'react-native-fast-image';

export default function ImageScreen({navigation, route}) {
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
        <ImageZoom
          style={{flex: 1, height: '100%', width: '100%'}}
          cropWidth={Dimensions.get('window').width}
          cropHeight={Dimensions.get('window').height}
          imageWidth={Dimensions.get('window').width}
          imageHeight={Dimensions.get('window').height}>
          <StyledImg
            resizeMode={FastImage.resizeMode.contain}
            source={{uri: highQuality}}
          />
        </ImageZoom>
      )}
    </>
  );
}
