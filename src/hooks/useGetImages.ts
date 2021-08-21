import {useContext, useState} from 'react';
import {OptionType} from '../components/NavBar/PopularNavBar';
import {SettingsContext} from '../contexts/settingsContext/context';
import {DanBooru} from '../services/danbooru';
import {Data} from '../services/danbooru.types';
import {useParamsType} from './useParams';

export default function useGetImages({params, paramsDispatch}: useParamsType) {
  const {settings} = useContext(SettingsContext);
  const [data, setData] = useState<Data[]>([]);
  const [error, setError] = useState({});
  const Danbooru = new DanBooru();

  const getPopular = (
    popularParams: {dateObject: Date; scale: OptionType},
    refresh?: boolean,
  ) => {
    let pageNum = params.page;
    if (refresh) {
      setData([]);
      pageNum = 1;
      paramsDispatch({type: 'resetPage'});
    }
    const date = `${popularParams.dateObject.getFullYear()}-${
      popularParams.dateObject.getMonth() + 1
    }-${popularParams.dateObject.getDate()}`;

    Danbooru.fetchPopularImage(
      {
        date: date,
        scale: popularParams.scale,
        page: pageNum,
        limit: settings.limit,
      },
      settings.safe,
    )
      .then(result => {
        if (refresh) {
          setData([...result]);
          return paramsDispatch({type: 'incrementPage'});
        }
        setData(prev => prev.concat(result));
        paramsDispatch({type: 'incrementPage'});
      })
      .catch(err => setError(err));
  };

  const getData = (refresh?: boolean) => {
    let pageNum = params.page;
    if (refresh) {
      setData([]);
      pageNum = 1;
      paramsDispatch({type: 'resetPage'});
    }
    const requestParams = {limit: settings.limit, page: pageNum, tags: ''};
    if (params.arrayTags.length) {
      const tags = params.arrayTags.join(' ');
      requestParams.tags = tags;
    }

    Danbooru.fetchImage(requestParams, settings.safe)
      .then(result => {
        if (refresh) {
          setData([...result]);
          return paramsDispatch({type: 'incrementPage'});
        }
        setData(prev => prev.concat(result));
        paramsDispatch({type: 'incrementPage'});
      })
      .catch(err => setError(err));
  };

  return {data, getData, error, getPopular};
}
