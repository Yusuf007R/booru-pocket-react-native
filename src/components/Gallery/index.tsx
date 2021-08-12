import React, {Fragment, useCallback, useContext, useRef} from 'react';
import {ActivityIndicator, Dimensions, View} from 'react-native';
import {WaterfallList} from 'react-native-largelist-v3';
import Animated from 'react-native-reanimated';
import {ThemeContext} from 'styled-components/native';
import {SettingsContext} from '../../contexts/settingsContext/context';
import {Data} from '../../services/danbooru.types';
import Item from '../GalleryItem';
import {LoadingContainer} from './styles';

type Props = {
  refreshData: () => void;
  fetchData: () => void;
  headerHeight: number;
  scrollY: Animated.Value<0>;
  GalleryRef: React.RefObject<WaterfallList<Data>>;
  data: Data[];
};

function Gallery({
  refreshData,
  fetchData,
  headerHeight,
  scrollY,
  GalleryRef,
  data,
}: Props) {
  const {settings} = useContext(SettingsContext);
  const contentSizeHeight = useRef(0);
  const theme = useContext(ThemeContext);

  const RenderItem = (item: Data) => (
    <Item data={item} quality={settings.quality} />
  );

  const memoizedHeader = useCallback(() => {
    const {width} = Dimensions.get('window');
    return <View style={{height: headerHeight - 10, width}} />;
  }, []);

  const memoizedHeightGetter = useCallback(element => {
    const {width} = Dimensions.get('window');
    const diff = element.image_height / element.image_width;
    return (width / settings.column) * diff;
  }, []);
  // @ts-ignore
  const Scroll = ({nativeEvent: {contentOffset}}) => {
    if (contentOffset.y < 0) {
      scrollY.setValue(0);
    } else {
      scrollY.setValue(contentOffset.y);
    }
    if (GalleryRef.current) {
      const height: number =
        // @ts-ignore
        GalleryRef.current._scrollView.current._contentHeight;
      if (height - contentOffset.y < 3500) {
        if (contentSizeHeight.current === height) {
          return;
        }
        contentSizeHeight.current = height;
        fetchData();
      }
    }
  };

  return (
    <Fragment>
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
      ) : (
        <LoadingContainer>
          <ActivityIndicator size="large" color={theme.main} />
        </LoadingContainer>
      )}
    </Fragment>
  );
}

export default Gallery;
