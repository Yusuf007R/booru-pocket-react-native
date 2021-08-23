import React, {useCallback, useState} from 'react';
import {StackTypes} from '../../router';
import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import FastImage from 'react-native-fast-image';
import {ImageScreenContainer, StyledImg} from './styles';
import {Data} from '../../services/danbooru.types';
import Gallery from 'react-native-awesome-gallery';

type ItemTypes = {
  item: Data;
  setImageDimensions: (dimentions: Dimensions) => void;
};

type Dimensions = {
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

  const renderItem = useCallback(({item, setImageDimensions}: ItemTypes) => {
    return (
      <StyledImg
        onLoad={e => {
          const {height: h, width: w} = e.nativeEvent;
          setImageDimensions({height: h, width: w});
        }}
        resizeMode={FastImage.resizeMode.center}
        source={{uri: item.highQuality}}
      />
    );
  }, []);

  const keyExtractor = useCallback(
    (item: Data, i: number) => `${i}${item.id}`,
    [],
  );

  return (
    <ImageScreenContainer>
      <Gallery
        numToRender={3}
        keyExtractor={keyExtractor}
        emptySpaceWidth={0}
        initialIndex={index}
        renderItem={renderItem}
        data={data}
        disableVerticalSwipe={true}
        onIndexChange={i => {
          setCurrentImg(i);
        }}
      />
    </ImageScreenContainer>
  );
}
export default ImageScreen;
