import React, {
  useEffect,
  useRef,
  useCallback,
  useMemo,
  useContext,
} from 'react';
import {Dimensions, View} from 'react-native';
import useGetImages from '../../hooks/useGetImages';
import Animated from 'react-native-reanimated';
import Navbar from '../../components/navBar';
import Item from '../../components/GalleryItem';
import {WaterfallList} from 'react-native-largelist-v3';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {Data} from '../../services/fetchImage';
import {Container} from './styles';
import {SettingsContext} from '../../contexts/settingsContext/context';

function GalleryScreen() {
  const {settings} = useContext(SettingsContext);
  const GalleryRef = useRef<WaterfallList<Data>>(null);
  const refreshing = useRef(false);
  const {data, getData} = useGetImages();
  const contentSizeHeight = useRef(0);
  const scrollY = useMemo(() => new Animated.Value(0), []);
  const headerHeight = useMemo(() => 70 + getStatusBarHeight(), []);

  const fetchData = () => {
    getData();
  };

  const refreshData = () => {
    getData(true, GalleryRef);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const Scroll = ({nativeEvent: {contentOffset}}) => {
    if (contentOffset.y < 0) {
      scrollY.setValue(0);
    } else {
      scrollY.setValue(contentOffset.y);
    }

    // ! this maybe broken, need to check it
    if (GalleryRef.current) {
      // @ts-ignore
      const height = GalleryRef.current._scrollView.current._contentHeight;
      if (height - contentOffset.y < 3500) {
        if (contentSizeHeight.current === height) {
          return;
        }
        contentSizeHeight.current = height;
        fetchData();
      }
    }
  };

  const RenderItem = item => <Item data={item} quality={settings.quality} />;

  const memoizedHeader = useCallback(() => {
    const {width} = Dimensions.get('window');
    return <View style={{height: headerHeight - 10, width}} />;
  }, []);

  const memoizedHeightGetter = useCallback(element => {
    const {width} = Dimensions.get('window');
    const diff = element.image_height / element.image_width;
    return (width / settings.column) * diff;
  }, []);

  return (
    <Container>
      <Navbar
        scrollY={scrollY}
        headerHeight={headerHeight}
        refreshGallery={refreshData}
        //! I think this is not needed anymore
        refreshingGallery={refreshing}
      />
      {data.length ? (
        <WaterfallList
          renderHeader={memoizedHeader}
          data={data}
          ref={GalleryRef}
          heightForItem={memoizedHeightGetter}
          renderItem={RenderItem}
          numColumns={settings.column}
          onRefresh={refreshData}
          onScroll={Scroll}
        />
      ) : null}
    </Container>
  );
}

export default React.memo(GalleryScreen);
