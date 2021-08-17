import React, {useCallback, useMemo} from 'react';
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

function ImageScreen(props: Props) {
  const theme = useContext(ThemeContext);
  const {data, index} = props.route.params;
  const elem = useMemo(() => data[index], [index]);

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
      {elem.video ? (
        <VideoPlayer
          navigator={props.navigation}
          source={{
            uri: elem.highQuality,
          }}
        />
      ) : (
        <ImageViewer
          renderIndicator={() => <></>}
          // maxOverflow={0}
          loadingRender={memoizedLoading}
          imageUrls={data}
          renderImage={memoizedImage}
          index={index}
        />
      )}
    </Container>
  );
}
export default React.memo(ImageScreen);
