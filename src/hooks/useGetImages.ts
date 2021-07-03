import {useContext, useState} from 'react';
import fetchImage, {Data} from '../services/fetchImage';
import {ParamsContext} from '../contexts/paramsContext/context';
import {WaterfallList} from 'react-native-largelist-v3';
import {SettingsContext} from '../contexts/settingsContext/context';

export default function useGetImages() {
  const {params, paramsDispatch} = useContext(ParamsContext);
  const {settings} = useContext(SettingsContext);
  const [data, setData] = useState<Data[]>([]);
  const [error, setError] = useState({});

  const getData = (
    refresh?: boolean,
    ref?: React.RefObject<WaterfallList<Data>>,
  ) => {
    const arrayTagsCopy = [...params.arrayTags];
    let pageNum = params.page;
    if (refresh) {
      ref?.current?.scrollTo({x: 0, y: 0});
      pageNum = 1;
      paramsDispatch({type: 'resetPage'});
    }
    const requestParams = {limit: params.limit, page: pageNum, tags: ''};
    if (settings.safe) {
      arrayTagsCopy.push('rating:safe');
    }
    if (arrayTagsCopy.length) {
      //! the second copy may no be needed
      const tagsCopy = [...arrayTagsCopy];
      const tags = tagsCopy.join(' ');
      requestParams.tags = tags;
    }

    fetchImage(requestParams)
      .then(result => {
        const FilteredResult = result.filter(
          element => element.large_file_url || element.preview_file_url,
        );
        if (refresh) {
          setData([...FilteredResult]);
          ref?.current?.endRefresh();
          return paramsDispatch({type: 'incrementPage'});
        }
        setData(prevData => [...prevData, ...FilteredResult]);
        paramsDispatch({type: 'incrementPage'});
      })
      .catch(err => setError(err));
  };

  return {data, getData, error};
}
