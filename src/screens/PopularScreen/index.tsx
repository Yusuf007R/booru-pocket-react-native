import React, {useEffect, useRef, useMemo, useContext} from 'react';
import useGetImages from '../../hooks/useGetImages';
import Navbar, {OptionType} from '../../components/NavBar/PopularNavBar';
import {WaterfallList} from 'react-native-largelist-v3';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {Container} from '../../components/Containers';
import {ScrollValueContext} from '../../../App';
import {Data} from '../../services/danbooru.types';
import useParams from '../../hooks/useParams';
import {RouteProp} from '@react-navigation/native';
import {DrawerTypes} from '../../router';
import Gallery from '../../components/Gallery';
import {useState} from 'react';

type RouteType = RouteProp<DrawerTypes, 'HomeGallery'>;

function PopularScreen({route: {params}}: {route: RouteType}) {
  const paramsObject = useParams(params);
  const scrollY = useContext(ScrollValueContext);
  const GalleryRef = useRef<WaterfallList<Data>>(null);
  const {data, getPopular} = useGetImages(paramsObject);
  const headerHeight = useMemo(() => 70 + getStatusBarHeight(), []);
  const [popularParams, setPopularParams] = useState<{
    dateObject: Date;
    scale: OptionType;
  }>({dateObject: new Date(), scale: 'day'});
  const fetchData = () => {
    getPopular(popularParams);
  };

  const refreshData = () => {
    getPopular(popularParams, true, GalleryRef);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    getPopular(popularParams, true);
  }, [popularParams]);

  return (
    <Container>
      <Navbar
        scrollY={scrollY}
        headerHeight={headerHeight}
        setParams={setPopularParams}
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

export default React.memo(PopularScreen);
