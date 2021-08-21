import React, {
  useEffect,
  useRef,
  useMemo,
  useContext,
  useCallback,
} from 'react';
import useGetImages from '../../hooks/useGetImages';
import Navbar from '../../components/NavBar/GalleryNavBar';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {Container} from '../../components/Containers';
import {ScrollValueContext} from '../../../App';
import useParams from '../../hooks/useParams';
import {RouteProp} from '@react-navigation/native';
import {DrawerTypes} from '../../router';
import Gallery from '../../components/Gallery';

type RouteType = RouteProp<DrawerTypes, 'HomeGallery'>;

function GalleryScreen({route: {params}}: {route: RouteType}) {
  const paramsObject = useParams(params);
  const scrollY = useContext(ScrollValueContext);
  const {data, getData} = useGetImages(paramsObject);
  const headerHeight = useMemo(() => 70 + getStatusBarHeight(), []);
  const refreshing = useRef(false);

  const fetchData = useCallback(() => {
    getData();
  }, [getData]);

  const refreshData = useCallback(() => {
    getData(true);
  }, [getData]);

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
