import React, {useEffect, useState} from 'react';
import {Dimensions} from 'react-native';
import {StyledImg} from './styles';
import ImageZoom from 'react-native-image-pan-zoom';
import VideoPlayer from 'react-native-video-controls';
import FastImage from 'react-native-fast-image';

export default function ImageScreen({navigation, route}) {
  const [index, setIndex] = useState(route.params.index);
  const [rerender, setRerender] = useState(1);

  useEffect(() => {
    Dimensions.addEventListener('change', () => {
      setRerender((prev) => prev + 1);
    });
  }, []);

  // const Img = ({route}) => {
  //   const {data} = route.params;
  //   return (
  //     // <VideoPlayer
  //     //   source={{
  //     //     uri: data.large_file_url,
  //     //   }}
  //     // />

  //   );
  //     };
  return (
    <ImageZoom
      style={{flex: 1, height: '100%', width: '100%'}}
      cropWidth={Dimensions.get('window').width}
      cropHeight={Dimensions.get('window').height}
      imageWidth={Dimensions.get('window').width}
      imageHeight={Dimensions.get('window').height}>
      <StyledImg
        resizeMode={FastImage.resizeMode.contain}
        source={{uri: route.params.data[index].large_file_url}}
      />
    </ImageZoom>
  );
}
