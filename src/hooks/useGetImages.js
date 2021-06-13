import {useContext, useRef, useState} from 'react';
import fetchImage from '../services/fetchImage';
import {ParamsContext} from '../contexts/paramsContext/context';
import {Dimensions} from 'react-native';
import {useEffect} from 'react';

export default function useGetImages() {
  const {
    params: {page, limit, arrayTags, safe},
    setParams,
  } = useContext(ParamsContext);
  const [data, setData] = useState([]);
  const [error, setError] = useState({});
  const totalHeight = useRef(0);

  useEffect(() => {
    console.log(data.length);
  }, [data]);
  const getData = (refresh, ref) => {
    let arrayTagsCopy = [...arrayTags];
    let pageNum = page;
    if (refresh) {
      pageNum = 1;
      totalHeight.current = 0;
    }
    const requestParams = {limit, page: pageNum};

    if (safe) {
      arrayTagsCopy.push('rating:safe');
    }
    if (arrayTagsCopy.length) {
      let tags = [...arrayTagsCopy];
      tags = tags.join(' ');
      requestParams.tags = tags;
    }

    fetchImage(requestParams)
      .then((result) => {
        const {width, height} = Dimensions.get('window');

        let FilteredResult = result.filter(
          (element) => element.large_file_url || element.preview_file_url,
        );

        for (let i = 0; i < FilteredResult.length; i++) {
          const diff =
            FilteredResult[i].image_height / FilteredResult[i].image_width;
          const imageHeight = (width / 2) * diff;
          // const imageWidth = width / 2;
          totalHeight.current += imageHeight;
          FilteredResult[i] = {
            ...FilteredResult[i],
            image_height: imageHeight,
            // image_width: imageWidth,
          };
        }

        if (refresh) {
          setData([...FilteredResult]);
          ref.current.endRefresh();
          return setParams((prev) => ({...prev, page: pageNum + 1}));
        }
        setData((prevData) => [...prevData, ...FilteredResult]);
        setParams((prev) => ({...prev, page: prev.page + 1}));
      })
      .catch((error) => setError(error));
  };

  return {data, getData, error, totalHeight};
}
