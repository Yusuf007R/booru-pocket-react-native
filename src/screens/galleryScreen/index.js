import React, {useEffect, useState, useRef, useCallback, useMemo} from 'react';
import {StatusBar, View} from 'react-native';
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
  const {data, getData} = useGetImages();
  const contentSizeHeight = useRef(null);
  const [quality, setQuality] = useState(true);
  const scrollY = useMemo(() => new Animated.Value(0), []);
  const headerHeight = useMemo(() => 70 + StatusBar.currentHeight, []);
  const [dataProvider, setDataProvider] = useState(dataProviderMaker(data));

  const _layoutProvider = useRef(layoutMaker()).current;

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

  const scroll = ({nativeEvent}) => {
    if (nativeEvent.contentOffset.y < 0) {
      scrollY.setValue(0);
    } else {
    }
    scrollY.setValue(nativeEvent.contentOffset.y);

    if (nativeEvent.contentOffset.y - nativeEvent.contentSize.height > -2500) {
      if (contentSizeHeight.current === nativeEvent.contentSize.height) {
        return;
      }
      contentSizeHeight.current = nativeEvent.contentSize.height;
      fetchData();
    }
  };

  const memoizedRender = useCallback(
    (index, item) => <Item imageData={item} quality={quality} />,
    [quality],
  );

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
          key={ListKey.current}
          ref={GalleryRef}
          style={{paddingTop: headerHeight - 5}}
          scrollViewProps={{scrollEventThrottle: 16}}
          layoutProvider={_layoutProvider}
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
