import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {StyledImg, StyledTouchableOpacity} from './styles';

function Item({imageData, quality}) {
  const navigation = useNavigation();
  return (
    <StyledTouchableOpacity
      onPress={() => {
        navigation.push('IMG', {
          data: imageData.large_file_url,
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

// export default Item;
export default React.memo(Item, () => false);
