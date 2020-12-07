import {useState} from 'react';
import fetchImage from '../services/fetchImage';

export const useGetImages = () => {
  const [data, setData] = useState([]);
  const [states, setStates] = useState({
    params: {
      limit: 50,
      page: 1,
      arrayTags: ['genshin_impact', 'rating:safe'],
    },
    loading: false,
    refreshing: false,
  });

  const getMoreData = async () => {
    if (states.loading) {
      return;
    }
    const {page, limit, arrayTags} = states.params;
    let tags = arrayTags.join(' ');
    setStates((prev) => ({...prev, loading: true}));
    try {
      const result = await fetchImage({page, limit, tags});
      setData((prevData) => [...prevData, ...result]);
      setStates((prev) => ({
        ...prev,
        loading: false,
        params: {...prev.params, page: prev.params.page + 1},
        refreshing: false,
      }));
    } catch (error) {
      return error;
    }
  };

  const refreshData = async () => {
    if (states.refreshing) {
      return;
    }
    const {limit, arrayTags} = states.params;
    let tags = arrayTags.join(' ');
    setStates((prev) => ({...prev, refreshing: true}));
    try {
      const result = await fetchImage({page: 1, limit, tags});
      setData(result);
      setStates((prev) => ({
        ...prev,
        page: prev.page + 1,
        refreshing: false,
      }));
    } catch (error) {
      return error;
    }
  };

  return {data, getMoreData, states, refreshData};
};
