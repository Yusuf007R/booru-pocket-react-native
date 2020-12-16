import {useContext, useRef, useState} from 'react';
import fetchImage from '../services/fetchImage';
import {ParamsContext} from '../contexts/paramsContext/context';

export default function useGetImages() {
  const {
    params: {page, limit, arrayTags, safe},
    setParams,
  } = useContext(ParamsContext);
  const [data, setData] = useState(['xd']);
  const [error, setError] = useState({});

  const getData = (refresh) => {
    let arrayTagsCopy = [...arrayTags];
    let pageNum = page;
    if (refresh) {
      pageNum = 1;
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

    // console.log(params);
    fetchImage(requestParams)
      .then((result) => {
        let FilteredResult = result.filter(
          (element) => element.large_file_url || element.preview_file_url,
        );
        if (refresh) {
          setData(['xd', ...FilteredResult]);

          return setParams((prev) => ({...prev, page: pageNum + 1}));
        }
        setData((prevData) => [...prevData, ...FilteredResult]);
        setParams((prev) => ({...prev, page: prev.page + 1}));
      })
      .catch((error) => setError(error));
  };

  return {data, getData, error};
}
