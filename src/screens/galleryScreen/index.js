import React, {useEffect, useState, useRef, useCallback, useMemo} from 'react';
import {StatusBar, Dimensions, View} from 'react-native';
import useGetImages from '../../hooks/useGetImages';
import Animated from 'react-native-reanimated';
import Navbar from '../../components/navBar';
import {RecyclerListView, DataProvider, LayoutProvider} from 'recyclerlistview';
import Item from '../../components/GalleryItem';
// import reactotron from 'reactotron-react-native';

let {width} = Dimensions.get('window');
const ViewTypes = {
  FULL: 0,
  HALF_LEFT: 1,
  HALF_RIGHT: 2,
};
const dataProviderMaker = (xd) =>
  new DataProvider((r1, r2) => r1.id !== r2.id).cloneWithRows(xd);

const layoutMaker = () =>
  new LayoutProvider(
    (index) => {
      if (index % 2 === 0) {
        return ViewTypes.HALF_LEFT;
      } else {
        return ViewTypes.HALF_RIGHT;
      }
    },
    (type, dim) => {
      switch (type) {
        case ViewTypes.HALF_LEFT:
          dim.width = width / 2;
          dim.height = width / 2;
          break;
        case ViewTypes.HALF_RIGHT:
          dim.width = width / 2 - 0.001;
          dim.height = width / 2;
          break;
        default:
          dim.width = 0;
          dim.height = 0;
      }
    },
  );

function GalleryScreen() {
  const GalleryRef = useRef(null);
  const {data, getMoreData, states, refreshData} = useGetImages();
  // reactotron.onCustomCommand('data', () => reactotron.log(data.length));

  const [quality, setQuality] = useState(true);
  const scrollY = useMemo(() => new Animated.Value(0), []);
  const headerHeight = useMemo(() => 70 + StatusBar.currentHeight, []);
  const [dataProvider, setDataProvider] = useState(dataProviderMaker(data));

  const _layoutProvider = useRef(layoutMaker()).current;

  const more = () => {
    getMoreData();
  };

  useEffect(() => {
    getMoreData();
  }, []);

  useEffect(() => {
    // console.log(data);
    setDataProvider(dataProviderMaker(data));
  }, [data]);

  // const getLayout = useCallback(
  //   ({data, index}) => ({
  //     length: itemHeight,
  //     offset: itemHeight * index,
  //     index,
  //   }),
  //   [],
  // );

  const memoizedValue = useCallback(
    (index, item) => <Item imageData={item} quality={quality} />,
    [data, quality],
  );

  // const keyExtractor = useCallback((item, index) => item.large_file_url, []);

  // const Footer = useCallback(() => {
  //   if (!states.loading) {
  //     return null;
  //   }
  //   return <ActivityIndicator size="large" color="#00ff00" />;
  // }, []);

  // console.log('re-render');

  return (
    <View style={{flex: 1}}>
      <Navbar
        ListRef={GalleryRef}
        scrollY={scrollY}
        headerHeight={headerHeight}
        refreshGallery={refreshData}
      />
      {data.length ? (
        <RecyclerListView
          scrollViewProps={{scrollEventThrottle: 16}}
          style={{
            paddingTop: headerHeight - 5,
          }}
          layoutProvider={_layoutProvider}
          dataProvider={dataProvider}
          rowRenderer={memoizedValue}
          extendedState={{quality}}
          onEndReached={more}
          onEndReachedThreshold={0.6}
          onScroll={(e) => {
            if (
              e.nativeEvent.contentOffset.y - e.nativeEvent.contentSize.height >
              -2500
            ) {
              more();
            }
            if (e.nativeEvent.contentOffset.y < 0) {
              return scrollY.setValue(0);
            }
            scrollY.setValue(e.nativeEvent.contentOffset.y);
          }}
        />
      ) : null}
      {/* <FlatList
        getItemLayout={getLayout}
        scrollEventThrottle={16}
        ref={GalleryRef}
        style={{paddingTop: headerHeight - 5}}
        data={data}
        renderItem={memoizedValue}
        keyExtractor={keyExtractor}
        numColumns={2}
        onEndReached={more}
        onEndReachedThreshold={2}
        onRefresh={refreshData}
        refreshing={states.refreshing}
        ListFooterComponent={Footer}
        onScroll={(e) => {
          if (e.nativeEvent.contentOffset.y < 0) {
            return scrollY.setValue(0);
          }
          scrollY.setValue(e.nativeEvent.contentOffset.y);
        }}
      /> */}
    </View>
  );
}
export default GalleryScreen;
