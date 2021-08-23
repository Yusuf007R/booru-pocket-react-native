import React, {Fragment, useContext, useState} from 'react';
import {ActivityIndicator} from 'react-native';
import FastImage from 'react-native-fast-image';
import {ThemeContext} from 'styled-components/native';
import {Dimensions} from '../../screens/ImageScreen';
import {Data} from '../../services/danbooru.types';
import {StyledImg} from '../GalleryItem/styles';
import {LoadingContainer, StyledVideo, VideoContainer} from './styles';

type Props = {
  item: Data;
  setImageDimensions: (dimentions: Dimensions) => void;
  index: number;
  currentImg: number;
};

export default function ImageItem({
  item,
  index,
  setImageDimensions,
  currentImg,
}: Props) {
  const [loading, setLoading] = useState(true);
  const theme = useContext(ThemeContext);
  return (
    <Fragment>
      {loading && (
        <LoadingContainer>
          <ActivityIndicator size="large" color={theme.main} />
        </LoadingContainer>
      )}
      {item.video ? (
        <VideoContainer>
          <StyledVideo
            repeat={true}
            controls={true}
            paused={index !== currentImg}
            resizeMode="contain"
            source={{uri: item.highQuality}}
            onLoad={() => setLoading(false)}
          />
        </VideoContainer>
      ) : (
        <StyledImg
          onLoad={e => {
            const {height: h, width: w} = e.nativeEvent;
            setImageDimensions({height: h, width: w});
            setLoading(false);
          }}
          resizeMode={FastImage.resizeMode.center}
          source={{uri: item.highQuality}}
        />
      )}
    </Fragment>
  );
}
