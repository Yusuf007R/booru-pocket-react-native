import {useState} from 'react';
import {fetchImage} from '../services/fetchImage';

export const useGetImages = () => {
  const [data, setData] = useState([]);
  const [states, setStates] = useState({
    limit: 50,
    page: 1,
    loading: false,
    refreshing: false,
  });

  const getImage = async (refresh) => {
    console.log(['hook', states]);
    // if (states.loading) {
    //   return;
    // }
    // setStates((prev) => ({...prev, loading: true}));
    if (refresh) {
      setStates((prev) => ({...prev, page: 1, refreshing: true}));
    }
    try {
      const result = await fetchImage(states);
      if (states.page === 1) {
        setStates((prev) => ({...prev, page: prev.page + 1}));
        return setData(result);
      }
      setStates((prev) => ({
        ...prev,
        // loading: !prev.loading,
        page: prev.page + 1,
        // refreshing: !prev.refreshing && false,
      }));
      setData((prevData) => [...prevData, ...result]);
    } catch (error) {
      return error;
    }
  };

  return {data, getImage, states};
};
