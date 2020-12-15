import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {StyledImg, StyledTouchableOpacity} from './styles';
import get_url_extension from '../../utils/getUrlExtention';

function Item({data, quality}) {
  const navigation = useNavigation();
  const file = get_url_extension(data.large_file_url);
  const video = file === 'mp4' || file === 'webm';

  const URL = () => {
    if (video) {
      return data.preview_file_url;
    }
    if (quality) {
      return data.large_file_url;
    }
    return data.preview_file_url;
  };

  return (
    <StyledTouchableOpacity
      onPress={() => {
        navigation.push('IMG', {
          data: data,
        });
      }}>
      <StyledImg
        source={{
          uri: URL(),
        }}
      />
    </StyledTouchableOpacity>
  );
}
export default React.memo(Item, () => false);
