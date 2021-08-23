import React from 'react';
import {StyledImg, StyledTouchableOpacity} from './styles';
import FastImage from 'react-native-fast-image';
import {Data} from '../../services/danbooru.types';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {StackTypes} from '../../router';

interface Props {
  data: Data[];
  quality: boolean;
  index: number;
}

function Item({data, quality, index}: Props) {
  const navigation = useNavigation<StackNavigationProp<StackTypes>>();

  return (
    <StyledTouchableOpacity
      onPress={() => {
        navigation.push('IMG', {
          data: data,
          index: index,
        });
      }}>
      <StyledImg
        source={{
          uri: quality ? data[index].highQuality : data[index].lowQuality,
        }}
        resizeMode={FastImage.resizeMode.cover}
      />
    </StyledTouchableOpacity>
  );
}
export default React.memo(Item);
