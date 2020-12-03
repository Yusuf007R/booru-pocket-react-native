import React from 'react';
import {useEffect, useState} from 'react';
import {FlatList, Button, ActivityIndicator} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import {StyledImg, StyledTouchableOpacity} from './styles';
import {useGetImages} from '../../hooks/useGetImages';

export default function GalleryScreen() {
  const {data, getImage, states} = useGetImages();
  const [quality, setQuality] = useState(false);

  const more = () => {
    getImage();
  };

  useEffect(() => {
    getImage();
  }, []);

  const refreshdata = () => {
    getImage(true);
  };

  console.log('re-render');
  const RenderItem = ({item}) => {
    return <Item xd={item} />;
  };

  const Item = ({xd}) => {
    const navigation = useNavigation();
    return (
      <StyledTouchableOpacity
        onPress={() => {
          navigation.push('IMG', {
            data: xd,
          });
        }}>
        <StyledImg
          source={{uri: quality ? xd.large_file_url : xd.preview_file_url}}
        />
      </StyledTouchableOpacity>
    );
  };

  const Footer = () => {
    if (!states.loading) {
      return null;
    }
    return <ActivityIndicator size="large" color="#00ff00" />;
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'black'}}>
      <Button title="Quality" onPress={() => setQuality((prev) => !prev)} />
      <FlatList
        style={{flex: 1, height: '100%'}}
        data={data}
        renderItem={RenderItem}
        keyExtractor={(item, index) => String(index)}
        numColumns={2}
        onEndReached={more}
        onEndReachedThreshold={5}
        onRefresh={refreshdata}
        refreshing={states.refreshing}
        ListFooterComponent={Footer}
      />
    </SafeAreaView>
  );
}
