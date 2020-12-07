import React, {useEffect, useState, useMemo, useRef} from 'react';
import {
  FlatList,
  TouchableOpacity,
  Text,
  ActivityIndicator,
  View,
  StatusBar,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {StyledImg, StyledTouchableOpacity, StyledAnimated} from './styles';
import {useGetImages} from '../../hooks/useGetImages';
import SearchInput from '../../components/SearchInput';
import Animated from 'react-native-reanimated';
import {FlexView} from '../../components/Containers';
import AutoCompleteList from '../../components/AutoCompleteList';
import Navbar from '../../components/navBar';

export default function GalleryScreen() {
  const GalleryRef = useRef(null);
  const {data, getMoreData, states, refreshData} = useGetImages();
  const [animation, setAnimation] = useState(true);
  const [quality, setQuality] = useState(true);
  const scrollY = new Animated.Value(0);
  const HeaderHeight = 70 + StatusBar.currentHeight;

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
    <FlexView>
      <Navbar
        ListRef={GalleryRef}
        scrollY={scrollY}
        HeaderHeight={HeaderHeight}
      />
      <FlatList
        ref={GalleryRef}
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
    </FlexView>
  );
}
