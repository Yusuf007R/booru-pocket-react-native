import {useContext, useRef, useState} from 'react';
import fetchImage from '../services/fetchImage';
import {ParamsContext} from '../contexts/paramsContext/context';

export default function useGetImages() {
  const {
    params: {page, limit, arrayTags},
    setParams,
  } = useContext(ParamsContext);
  const [data, setData] = useState([]);

  const getData = (refresh) => {
    let tags = [...arrayTags];
    tags = tags.join(' ');
    let pageNum = page;
    if (refresh) {
      pageNum = 1;
    }
    fetchImage({page: pageNum, limit, tags}).then((result) => {
      if (refresh) {
        setData(result);
        return setParams((prev) => ({...prev, page: pageNum + 1}));
      }
      setData((prevData) => [...prevData, ...result]);
      setParams((prev) => ({...prev, page: prev.page + 1}));
    });
  };

  return {data, getData};
}
