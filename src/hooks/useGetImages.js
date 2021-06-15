import {useContext, useState} from 'react';
import fetchImage from '../services/fetchImage';
import {ParamsContext} from '../contexts/paramsContext/context';

const neededProperties = [
  'large_file_url',
  'preview_file_url',
  'file_url',
  'id',
  'tag_string',
  'file_ext',
  'image_width',
  'image_height',
  'uploader_id',
  'file_size',
  'tag_string_character',
  'tag_string_copyright',
  'tag_string_artist',
];

export default function useGetImages() {
  const {
    params: {page, limit, arrayTags, safe},
    setParams,
  } = useContext(ParamsContext);
  const [data, setData] = useState([]);
  const [error, setError] = useState({});

  const getData = (refresh, ref) => {
    let arrayTagsCopy = [...arrayTags];
    let pageNum = page;
    if (refresh) {
      ref.current.scrollTo({x: 0, y: 0});
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

    fetchImage(requestParams)
      .then((result) => {
        const FilteredResult = result
          .filter(
            (element) => element.large_file_url || element.preview_file_url,
          )
          .map((element) => {
            return neededProperties.reduce((prev, item) => {
              return {...prev, [item]: element[item]};
            }, {});
          });

        if (refresh) {
          setData([...FilteredResult]);
          ref.current.endRefresh();
          return setParams((prev) => ({...prev, page: pageNum + 1}));
        }
        setData((prevData) => [...prevData, ...FilteredResult]);
        setParams((prev) => ({...prev, page: prev.page + 1}));
      })
      .catch((err) => setError(err));
  };

  return {data, getData, error};
}
