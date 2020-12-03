import React, {useEffect, useState, useMemo} from 'react';
import {FlatList, Button, ActivityIndicator} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import {StyledImg, StyledTouchableOpacity} from './styles';
import {useGetImages} from '../../hooks/useGetImages';

export default function GalleryScreen() {
  const {data, getMoreData, states, refreshData} = useGetImages();
  const [quality, setQuality] = useState(false);

  const more = () => {
    getMoreData();
  };

  useEffect(() => {
    getMoreData();
  }, []);

  const refreshdata = () => {
    refreshData();
  };

  const RenderItem = ({item}) => {
    return <Item xd={item} />;
  };

  const memoizedValue = useMemo(() => RenderItem, [data, quality]);

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
    <SafeAreaView style={{flex: 1, height: '100%'}}>
      <Button title="Quality" onPress={() => setQuality((prev) => !prev)} />
      <FlatList
        style={{flex: 1, height: '100%'}}
        data={data}
        renderItem={memoizedValue}
        keyExtractor={(item, index) => String(index)}
        numColumns={2}
        onEndReached={more}
        onEndReachedThreshold={1}
        onRefresh={refreshdata}
        refreshing={states.refreshing}
        ListFooterComponent={Footer}
      />
    </SafeAreaView>
  );
}
