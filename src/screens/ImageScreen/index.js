import React, {useEffect, useState} from 'react';
import {Dimensions, View} from 'react-native';
import {StyledImg} from './styles';
import ImageZoom from 'react-native-image-pan-zoom';
import VideoPlayer from 'react-native-video-controls';
import FastImage from 'react-native-fast-image';
import get_url_extension from '../../utils/getUrlExtention';

export default function ImageScreen({navigation, route}) {
  const [index, setIndex] = useState(route.params.index);
  const [rerender, setRerender] = useState(1);
  const {data} = route.params;
  const file = get_url_extension(data.large_file_url);
  const video = file === 'mp4' || file === 'webm';

  useEffect(() => {
    if (video) {
      return;
    }
    Dimensions.addEventListener('change', () => {
      setRerender((prev) => prev + 1);
    });
  }, []);

  return (
    <>
      {video ? (
        <VideoPlayer
          source={{
            uri: data.large_file_url,
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
            source={{uri: route.params.data.large_file_url}}
          />
        </ImageZoom>
      )}
    </>
  );
}
