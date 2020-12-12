import React, {useEffect, useState, useRef, useCallback, useMemo} from 'react';
import {FlatList, ActivityIndicator, StatusBar, Dimensions} from 'react-native';
import useGetImages from '../../hooks/useGetImages';
import Animated from 'react-native-reanimated';
import {FlexView} from '../../components/Containers';
import Navbar from '../../components/navBar';
import Item from '../../components/GalleryItem';

export default function GalleryScreen() {
  const GalleryRef = useRef(null);
  const {data, getMoreData, states, refreshData} = useGetImages();
  const [quality, setQuality] = useState(true);
  const scrollY = useMemo(() => new Animated.Value(0), []);
  const headerHeight = useMemo(() => 70 + StatusBar.currentHeight, []);
  const itemHeight = useMemo(() => Dimensions.get('window').width / 2, []);

  const more = () => getMoreData();

  useEffect(() => {
    getMoreData();
  }, []);

  const getLayout = useCallback(
    (data, index) => ({
      length: itemHeight,
      offset: itemHeight * index,
      index,
    }),
    [],
  );

  const refreshdata = () => refreshData();

  const memoizedValue = useCallback(
    ({item, index}) => (
      <Item imageData={item} quality={quality} index={index} data={data} />
    ),
    [data, quality],
  );

  const keyExtractor = useCallback((item, index) => item.large_file_url, []);

  const Footer = useCallback(() => {
    if (!states.loading) {
      return null;
    }
    return <ActivityIndicator size="large" color="#00ff00" />;
  }, []);

  return (
    <FlexView>
      <Navbar
        ListRef={GalleryRef}
        scrollY={scrollY}
        headerHeight={headerHeight}
        refreshGallery={refreshData}
      />
      <FlatList
        getItemLayout={getLayout}
        scrollEventThrottle={16}
        ref={GalleryRef}
        style={{paddingTop: headerHeight - 5}}
        data={data}
        renderItem={memoizedValue}
        keyExtractor={keyExtractor}
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
