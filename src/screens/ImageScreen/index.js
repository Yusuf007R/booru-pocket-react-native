import React, {useEffect, useState} from 'react';
import {Dimensions} from 'react-native';
import {StyledImg} from './styles';
import ImageZoom from 'react-native-image-pan-zoom';
import VideoPlayer from 'react-native-video-controls';

export default function ImageScreen({navigation, route}) {
  const [xd, setxd] = useState(1);

  useEffect(() => {
    Dimensions.addEventListener('change', () => {
      setxd((xdd) => xdd + 1);
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
      longPressTime={1500}
      onLongPress={() => {
        alert('xd');
      }}
      style={{
        flex: 1,
        backgroundColor: 'black',
      }}
      cropWidth={Dimensions.get('window').width}
      cropHeight={Dimensions.get('window').height}
      imageWidth={Dimensions.get('window').width}
      imageHeight={Dimensions.get('window').height}>
      <StyledImg
        resizeMode={'contain'}
        source={{uri: route.params.data.large_file_url}}
      />
    </ImageZoom>
  );
}
