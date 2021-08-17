import React, {useMemo} from 'react';
import {useNavigation} from '@react-navigation/native';
import {StyledImg, StyledTouchableOpacity} from './styles';

import FastImage from 'react-native-fast-image';
import {StackNavigationProp} from '@react-navigation/stack';
import {Data} from '../../services/danbooru.types';
import {StackTypes} from '../../router';

interface Props {
  data: Data[];
  quality: boolean;
  index: number;
}

function Item({data, quality, index}: Props) {
  const navigation = useNavigation<StackNavigationProp<StackTypes>>();
  const elem = useMemo(() => data[index], [index]);

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
          uri: quality ? elem.highQuality : elem.lowQuality,
        }}
        resizeMode={FastImage.resizeMode.stretch}
      />
    </StyledTouchableOpacity>
  );
}
export default React.memo(Item);
