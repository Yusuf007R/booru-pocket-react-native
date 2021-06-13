import React, {useEffect, useState, useRef, useCallback, useMemo} from 'react';
import {Dimensions, StatusBar, View} from 'react-native';
import useGetImages from '../../hooks/useGetImages';
import Animated from 'react-native-reanimated';
import Navbar from '../../components/navBar';
import Item from '../../components/GalleryItem';
import {WaterfallList} from 'react-native-largelist-v3';

function GalleryScreen() {
  const GalleryRef = useRef(null);
  const refreshing = useRef(false);
  const {data, getData, error, totalHeight} = useGetImages();
  const contentSizeHeight = useRef(null);
  const [quality, setQuality] = useState(true);
  const scrollY = useMemo(() => new Animated.Value(0), []);
  const headerHeight = useMemo(() => 70 + StatusBar.currentHeight, []);
  const {width, height} = Dimensions.get('window');

  const fetchData = () => {
    getData();
  };

  const refreshData = () => {
    getData(true, GalleryRef);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const scroll = ({nativeEvent: {contentOffset}}) => {
    if (contentOffset.y < 0) {
      return scrollY.setValue(0);
    }
    scrollY.setValue(contentOffset.y);
    if (contentOffset.y - totalHeight.current / 2 >= -2500) {
      if (contentSizeHeight.current === totalHeight.current / 2) {
        return;
      }
      contentSizeHeight.current = totalHeight.current / 2;
      fetchData();
    }
  };

  const memoizedRender = useCallback(
    (item) => <Item data={item} quality={quality} />,
    [quality],
  );

  const memoizedHeader = useCallback(
    () => <View style={{height: headerHeight - 10, width}} />,
    [],
  );

  const memoizedHeightGetter = useCallback((item) => item.image_height, []);

  return (
    <View style={{flex: 1}}>
      <Navbar
        ListRef={GalleryRef}
        scrollY={scrollY}
        headerHeight={headerHeight}
        refreshGallery={refreshData}
        refreshingGallery={refreshing}
      />
      {data.length ? (
        <WaterfallList
          renderHeader={memoizedHeader}
          data={data}
          ref={GalleryRef}
          heightForItem={memoizedHeightGetter}
          renderItem={memoizedRender}
          numColumns={2}
          onRefresh={refreshData}
          onScroll={scroll}
        />
      ) : null}
    </View>
  );
}
export default GalleryScreen;
