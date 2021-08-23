import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import {useWindowDimensions, RefreshControl} from 'react-native';
import Animated from 'react-native-reanimated';
import {SettingsContext} from '../../contexts/settingsContext/context';
import {Data} from '../../services/danbooru.types';
import Item from '../GalleryItem';
import BigList from 'react-native-big-list';
import {ThemeContext} from 'styled-components/native';

type Props = {
  refreshData: () => void;
  fetchData: () => void;
  headerHeight: number;
  scrollY: Animated.Value<0>;
  data: Data[];
};

function Gallery({refreshData, fetchData, headerHeight, scrollY, data}: Props) {
  const {settings} = useContext(SettingsContext);
  const {width} = useWindowDimensions();
  const contentSizeHeight = useRef(0);
  const [refreshing, setRefreshing] = useState(false);
  const theme = useContext(ThemeContext);

  // @ts-ignore
  const onScroll = ({nativeEvent}) => {
    'worklet';
    if (nativeEvent.contentOffset.y < 0) {
      scrollY.setValue(0);
    } else {
      // @ts-ignore
      scrollY.setValue(nativeEvent.contentOffset.y);
    }
    const heightCon: number = nativeEvent.contentSize.height;

    if (contentSizeHeight.current === heightCon) {
      return;
    }
    if (heightCon - nativeEvent.contentOffset.y < 3500) {
      contentSizeHeight.current = heightCon;
      fetchData();
    }
  };

  useEffect(() => {
    if (refreshing) {
      setRefreshing(false);
    }
  }, [data]);

  const RenderItem = useCallback(
    ({index}: {index: number}) => {
      return <Item quality={settings.quality} index={index} data={data} />;
    },
    [settings.quality, data],
  );

  return (
    <BigList
      data={data}
      numColumns={settings.column}
      horizontal={false}
      inverted={false}
      stickySectionHeadersEnabled={true}
      renderItem={RenderItem}
      renderHeader={() => <></>}
      headerHeight={headerHeight - 10}
      onScroll={onScroll}
      itemHeight={(width + width / 2) / settings.column}
      refreshControl={
        <RefreshControl
          colors={[theme.main]}
          tintColor={theme.main}
          refreshing={refreshing}
          progressViewOffset={headerHeight}
          onRefresh={() => {
            setRefreshing(true);
            refreshData();
          }}
        />
      }
    />
  );
}

export default React.memo(Gallery);
