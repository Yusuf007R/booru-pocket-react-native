import React, {useCallback, useContext, useRef} from 'react';
import {useWindowDimensions} from 'react-native';
import {WaterfallList} from 'react-native-largelist-v3';
import Animated from 'react-native-reanimated';
import {RefreshComponent} from '../RefreshHeader';

import {SettingsContext} from '../../contexts/settingsContext/context';
import {Data} from '../../services/danbooru.types';
import Item from '../GalleryItem';

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
  const {width} = useWindowDimensions();

  const RenderItem = (item: Data, index: number) => (
    <Item data={data} quality={settings.quality} index={index} />
  );

  const memoizedHeightGetter = useCallback(
    element => {
      const diff = element.image_height / element.image_width;
      return (width / settings.column) * diff;
    },
    [width, settings.column],
  );

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
    <WaterfallList
      style={{paddingTop: headerHeight - 10}}
      data={data}
      ref={GalleryRef}
      heightForItem={memoizedHeightGetter}
      renderItem={RenderItem}
      numColumns={settings.column}
      onRefresh={refreshData}
      onScroll={Scroll}
      refreshHeader={RefreshComponent}
    />
  );
}

export default React.memo(Gallery);
