import React, {useCallback, useEffect, useState, useRef} from 'react';
import {StackTypes} from '../../router';
import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {ImageScreenContainer} from './styles';
import {Data} from '../../services/danbooru.types';
import Gallery, {GalleryRef} from 'react-native-awesome-gallery';
import ImageItem from '../../components/ImageItem';
import useDimentions from '../../hooks/useDimentions';

export type ItemTypes = {
  item: Data;
  setImageDimensions: (dimentions: Dimensions) => void;
  index: number;
};

export type Dimensions = {
  height: number;
  width: number;
};

type Props = {
  navigation: StackNavigationProp<StackTypes>;
  route: RouteProp<StackTypes, 'IMG'>;
};

function ImageScreen({route}: Props) {
  const {data, index} = route.params;
  const [currentImg, setCurrentImg] = useState(0);
  const [currentIsVideo, setCurrentIsVideo] = useState(false);
  const galleryRef = useRef<GalleryRef>(null);
  const {width, height} = useDimentions();

  useEffect(() => {
    if (!data[currentImg].video && currentIsVideo) {
      setCurrentIsVideo(false);
    }
    if (data[currentImg].video && !currentIsVideo) {
      setCurrentIsVideo(true);
    }
  }, [currentImg]);

  const renderItem = useCallback(
    ({item, setImageDimensions, index: i}: ItemTypes) => {
      return (
        <ImageItem
          currentImg={currentImg}
          item={item}
          setImageDimensions={setImageDimensions}
          index={i}
        />
      );
    },
    [currentImg],
  );

  const keyExtractor = useCallback(
    (item: Data, i: number) => `${i}${item.id}:v`,
    [],
  );

  return (
    <ImageScreenContainer>
      <Gallery
        key={`${currentIsVideo}`}
        disablePinchToZoom={currentIsVideo}
        numToRender={currentIsVideo ? 1 : 3}
        doubleTapScale={currentIsVideo ? 1 : 3}
        keyExtractor={keyExtractor}
        ref={galleryRef}
        emptySpaceWidth={0}
        initialIndex={index}
        renderItem={renderItem}
        data={data}
        containerDimensions={{width, height}}
        disableVerticalSwipe={true}
        onIndexChange={i => {
          setCurrentImg(i);
        }}
      />
    </ImageScreenContainer>
  );
}
export default ImageScreen;
