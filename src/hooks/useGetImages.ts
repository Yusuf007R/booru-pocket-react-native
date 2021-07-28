import {useContext, useState} from 'react';
import {WaterfallList} from 'react-native-largelist-v3';
import {SettingsContext} from '../contexts/settingsContext/context';
import {DanBooru} from '../services/danbooru';
import {Data} from '../services/danbooru.types';
import {useParamsType} from './useParams';

export default function useGetImages({params, paramsDispatch}: useParamsType) {
  const {settings} = useContext(SettingsContext);
  const [data, setData] = useState<Data[]>([]);
  const [error, setError] = useState({});
  const Danbooru = new DanBooru();

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
    const requestParams = {limit: settings.limit, page: pageNum, tags: ''};
    if (settings.safe) {
      arrayTagsCopy.push('rating:safe');
    }
    if (arrayTagsCopy.length) {
      //! the second copy may no be needed
      const tagsCopy = [...arrayTagsCopy];
      const tags = tagsCopy.join(' ');
      requestParams.tags = tags;
    }

    Danbooru.fetchImage(requestParams)
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
