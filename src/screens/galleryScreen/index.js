import React, {useEffect, useState, useRef, useCallback, useMemo} from 'react';
import {
  // AsyncStorage,
  Dimensions,
  RefreshControl,
  StatusBar,
  View,
} from 'react-native';
import useGetImages from '../../hooks/useGetImages';
import Animated from 'react-native-reanimated';
import Navbar from '../../components/navBar';
import {RecyclerListView} from 'recyclerlistview';
import Item from '../../components/GalleryItem';
import {dataProviderMaker} from '../../utils/dataProvider';
import {layoutMaker} from '../../utils/layoutMaker';
// import Reactotron from 'reactotron-react-native';

// Reactotron.setAsyncStorageHandler(AsyncStorage) // AsyncStorage would either come from `react-native` or `@react-native-community/async-storage` depending on where you get it from
//   .configure() // controls connection & communication settings
//   .useReactNative() // add all built-in react native plugins
//   .connect(); // let's connect!

function GalleryScreen() {
  const GalleryRef = useRef(null);
  const ListKey = useRef(1);
  const refreshing = useRef(false);
  const {data, getData, error} = useGetImages();
  const contentSizeHeight = useRef(null);
  const [quality, setQuality] = useState(true);
  const scrollY = useMemo(() => new Animated.Value(0), []);
  const headerHeight = useMemo(() => 70 + StatusBar.currentHeight, []);
  const [dataProvider, setDataProvider] = useState(dataProviderMaker(data));

  useEffect(() => {
    function reRender({window: {width, height}}) {
      setlayoutProvider(layoutMaker(width > height, headerHeight));
    }
    Dimensions.addEventListener('change', reRender);
    return () => {
      Dimensions.removeEventListener('change', reRender);
    };
  }, []);

  const [layoutProvider, setlayoutProvider] = useState(
    layoutMaker(false, headerHeight),
  );

  const fetchData = () => {
    getData();
  };

  const refreshData = () => {
    getData(true);
    ListKey.current++;
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    setDataProvider(dataProviderMaker(data));
  }, [data]);

  const scroll = ({
    nativeEvent: {layoutMeasurement, contentOffset, contentSize},
  }) => {
    if (contentOffset.y < 0) {
      return scrollY.setValue(0);
    }
    scrollY.setValue(contentOffset.y);
    if (
      layoutMeasurement.height + contentOffset.y >=
      contentSize.height - 2500
    ) {
      if (contentSizeHeight.current === contentSize.height) {
        return;
      }
      contentSizeHeight.current = contentSize.height;
      fetchData();
    }
  };

  const memoizedRender = useCallback(
    (index, item) => <Item data={item} index={index} quality={quality} />,
    [quality],
  );

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
        <RecyclerListView
          renderAheadOffset={600}
          canChangeSize={true}
          key={ListKey.current}
          ref={GalleryRef}
          scrollViewProps={{
            scrollEventThrottle: 16,
            refreshControl: (
              <RefreshControl
                refreshing={refreshing.current}
                progressViewOffset={headerHeight}
                onRefresh={refreshData}
              />
            ),
          }}
          layoutProvider={layoutProvider}
          dataProvider={dataProvider}
          rowRenderer={memoizedRender}
          extendedState={{quality}}
          onScroll={scroll}
        />
      ) : null}
    </View>
  );
}
export default GalleryScreen;
