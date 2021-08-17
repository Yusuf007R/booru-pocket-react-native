import React, {useEffect, useRef, useMemo, useContext} from 'react';
import useGetImages from '../../hooks/useGetImages';
import Navbar from '../../components/NavBar/GalleryNavBar';
import {WaterfallList} from 'react-native-largelist-v3';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {Container} from '../../components/Containers';
import {ScrollValueContext} from '../../../App';
import {Data} from '../../services/danbooru.types';
import useParams from '../../hooks/useParams';
import {RouteProp} from '@react-navigation/native';
import {DrawerTypes} from '../../router';
import Gallery from '../../components/Gallery';

type RouteType = RouteProp<DrawerTypes, 'HomeGallery'>;

function GalleryScreen({route: {params}}: {route: RouteType}) {
  const paramsObject = useParams(params);
  const scrollY = useContext(ScrollValueContext);
  const GalleryRef = useRef<WaterfallList<Data>>(null);
  const {data, getData} = useGetImages(paramsObject);
  const headerHeight = useMemo(() => 70 + getStatusBarHeight(), []);
  const refreshing = useRef(false);

  const fetchData = () => {
    getData();
  };

  const refreshData = () => {
    getData(true, GalleryRef);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Container>
      <Navbar
        scrollY={scrollY}
        headerHeight={headerHeight}
        refreshGallery={refreshData}
        paramsObject={paramsObject}
        type={params.type}
        refreshing={refreshing}
      />
      <Gallery
        GalleryRef={GalleryRef}
        scrollY={scrollY}
        fetchData={fetchData}
        refreshData={refreshData}
        data={data}
        headerHeight={headerHeight}
      />
    </Container>
  );
}

export default React.memo(GalleryScreen);
