import React, {useEffect, useState, useMemo, useRef, useContext} from 'react';
import {
  FlatList,
  TouchableOpacity,
  Text,
  ActivityIndicator,
  View,
  StatusBar,
  Dimensions,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {StyledImg, StyledTouchableOpacity} from './styles';
import useGetImages from '../../hooks/useGetImages';
import Animated from 'react-native-reanimated';
import {FlexView} from '../../components/Containers';
import Navbar from '../../components/navBar';
import {ParamsContext} from '../../contexts/paramsContext/context';

export default function GalleryScreen() {
  const GalleryRef = useRef(null);
  const {data, getMoreData, states, refreshData} = useGetImages();
  const [quality, setQuality] = useState(true);
  const scrollY = new Animated.Value(0);
  const HeaderHeight = 70 + StatusBar.currentHeight;

  const more = () => {
    getMoreData();
  };

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
        refreshGallery={refreshData}
      />
      <FlatList
        scrollEventThrottle={16}
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
