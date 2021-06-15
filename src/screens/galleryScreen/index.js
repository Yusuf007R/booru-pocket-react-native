import React, {useEffect, useState, useRef, useCallback, useMemo} from 'react';
import {Dimensions, StatusBar, View} from 'react-native';
import useGetImages from '../../hooks/useGetImages';
import Animated from 'react-native-reanimated';
import Navbar from '../../components/navBar';
import Item from '../../components/GalleryItem';
import {WaterfallList} from 'react-native-largelist-v3';
import {FlexView} from '../../components/Containers';

function GalleryScreen() {
  const GalleryRef = useRef(null);
  const refreshing = useRef(false);
  const {data, getData} = useGetImages();
  const contentSizeHeight = useRef(0);
  const [column, setColumn] = useState(2);
  const [quality, setQuality] = useState(true);
  const scrollY = useMemo(() => new Animated.Value(0), []);
  const headerHeight = useMemo(() => 70 + StatusBar.currentHeight, []);
  const {width} = Dimensions.get('window');

  const fetchData = () => {
    getData();
  };

  const refreshData = () => {
    getData(true, GalleryRef);
  };
  useEffect(() => {
    fetchData();
  }, []);

  const memoizedScroll = ({nativeEvent: {contentOffset}}) => {
    if (contentOffset.y < 0) {
      scrollY.setValue(0);
    } else {
      scrollY.setValue(contentOffset.y);
    }

    // ! this maybe broken, need to check it
    let height = GalleryRef.current._scrollView.current._contentHeight;
    // console.log(contentOffset.y);
    if (height - contentOffset.y < 2500) {
      if (contentSizeHeight.current === height) {
        return;
      }
      contentSizeHeight.current = height;
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

  const memoizedHeightGetter = useCallback((element) => {
    const {width: widthx} = Dimensions.get('window');
    const diff = element.image_height / element.image_width;
    const imageHeight = (widthx / column) * diff;
    return imageHeight;
  }, []);

  return (
    <FlexView>
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
          numColumns={column}
          onRefresh={refreshData}
          onScroll={memoizedScroll}
        />
      ) : null}
    </FlexView>
  );
}
export default GalleryScreen;
