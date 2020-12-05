import React, {useEffect, useState, useMemo} from 'react';
import {FlatList, ActivityIndicator, View, StatusBar} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {StyledImg, StyledTouchableOpacity} from './styles';
import {useGetImages} from '../../hooks/useGetImages';
import SearchInput from '../../components/SearchInput';
import Animated from 'react-native-reanimated';

export default function GalleryScreen() {
  const {data, getMoreData, states, refreshData} = useGetImages();
  const [quality, setQuality] = useState(true);
  const scrollY = new Animated.Value(0);
  const HeaderHeight = 70 + StatusBar.currentHeight;
  const diffClamp = Animated.diffClamp(scrollY, 0, HeaderHeight);
  const translateY = Animated.interpolate(diffClamp, {
    inputRange: [0, HeaderHeight],
    outputRange: [0, -HeaderHeight],
  });

  const more = () => {
    getMoreData();
  };

  console.log('re-render');
  useEffect(() => {
    getMoreData();
  }, []);

  const refreshdata = () => {
    refreshData();
  };

  const renderItem = ({item, index}) => {
    return <Item imageData={item} index={index} />;
  };

  const memoizedValue = useMemo(() => renderItem, [data, quality]);

  const Item = ({imageData, index}) => {
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
            uri: quality
              ? imageData.large_file_url
              : imageData.preview_file_url,
          }}
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
    <View style={{flex: 1, backgroundColor: 'black'}}>
      <Animated.View
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: 0,
          height: HeaderHeight,
          zIndex: 1000,
          elevation: 1000,
          backgroundColor: 'transparent',
          transform: [{translateY: translateY}],
          alignItems: 'center',
          justifyContent: 'center',
          paddingTop: 45,
        }}>
        <SearchInput />
      </Animated.View>
      <FlatList
        style={{paddingTop: HeaderHeight - 5}}
        data={data}
        renderItem={memoizedValue}
        keyExtractor={(item, index) => String(index)}
        numColumns={2}
        onEndReached={more}
        onEndReachedThreshold={1}
        onRefresh={refreshdata}
        refreshing={states.refreshing}
        ListFooterComponent={Footer}
        onScroll={(e) => {
          if (e.nativeEvent.contentOffset.y < 0) {
            return scrollY.setValue(0);
          }
          scrollY.setValue(e.nativeEvent.contentOffset.y);
        }}
      />
    </View>
  );
}
