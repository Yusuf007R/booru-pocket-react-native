import {useContext, useState} from 'react';
import fetchImage from '../services/fetchImage';
import {ParamsContext} from '../contexts/paramsContext/context';

export default function useGetImages() {
  const {
    params: {page, limit, arrayTags},
    setParams,
  } = useContext(ParamsContext);

  const [data, setData] = useState([]);
  const [states, setStates] = useState({
    loading: false,
    refreshing: false,
  });

  const getMoreData = async () => {
    if (states.loading) {
      return;
    }
    setStates((prev) => ({...prev, loading: true}));
    try {
      let tags = [...arrayTags];
      tags = tags.join(' ');
      const result = await fetchImage({page, limit, tags});
      setData((prevData) => [...prevData, ...result]);
      setStates((prev) => ({
        ...prev,
        loading: false,
        refreshing: false,
      }));
      setParams((prev) => ({...prev, page: prev.page + 1}));
    } catch (error) {
      return error;
    }
  };

  const refreshData = async () => {
    if (states.refreshing) {
      return;
    }
    setStates((prev) => ({...prev, refreshing: true}));
    try {
      let tags = [...arrayTags];
      tags = tags.join(' ');
      const result = await fetchImage({page: 1, limit, tags});
      setData(result);
      setStates((prev) => ({
        ...prev,
        refreshing: false,
      }));
      setParams((prev) => ({...prev, page: 2}));
    } catch (error) {
      return error;
    }
  };

  return {data, getMoreData, states, refreshData};
}
