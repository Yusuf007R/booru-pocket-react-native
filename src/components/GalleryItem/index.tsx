import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {StyledImg, StyledTouchableOpacity} from './styles';
import parseData from '../../utils/parseData';
import FastImage from 'react-native-fast-image';
import {StackNavigationProp} from '@react-navigation/stack';
import {Data} from '../../services/fetchImage';

interface Props {
  data: Data;
  quality: boolean;
}

function Item({data, quality}: Props) {
  const navigation = useNavigation<StackNavigationProp<any>>();
  const {video, highQuality, lowQuality, SourceQuality} = parseData(data);
  return (
    <StyledTouchableOpacity
      onPress={() => {
        navigation.push('IMG', {
          data: data,
          video,
          highQuality,
          lowQuality,
        });
      }}>
      <StyledImg
        source={{
          uri: quality ? highQuality : lowQuality,
        }}
        resizeMode={FastImage.resizeMode.stretch}
      />
    </StyledTouchableOpacity>
  );
}
export default React.memo(Item);
