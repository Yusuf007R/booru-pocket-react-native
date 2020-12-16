import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {StyledImg, StyledTouchableOpacity} from './styles';
import get_url_extension from '../../utils/getUrlExtention';
import {Text, View} from 'react-native';

function Item({data, quality, index}) {
  const navigation = useNavigation();

  const {video, highQuality, lowQuality} = get_url_extension(data, index);

  return (
    <>
      {index !== 0 ? (
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
          />
        </StyledTouchableOpacity>
      ) : (
        <View style={{backgroundColor: 'white'}} />
      )}
    </>
  );
}
export default React.memo(Item, () => false);
