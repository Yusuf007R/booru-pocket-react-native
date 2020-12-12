import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {StyledImg, StyledTouchableOpacity} from './styles';
import FastImage from 'react-native-fast-image';

function Item({imageData, index, quality, data}) {
  const navigation = useNavigation();
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
          uri: quality ? imageData.large_file_url : imageData.preview_file_url,
        }}
      />
    </StyledTouchableOpacity>
  );
}

export default Item;
