import {useContext, useState} from 'react';
import fetchImage from '../services/fetchImage';
import {ParamsContext} from '../contexts/paramsContext/context';
// import {request} from '../utils/request';
// import {AsyncStorage} from 'react-native';

// import Reactotron from 'reactotron-react-native';

// Reactotron.setAsyncStorageHandler(AsyncStorage) // AsyncStorage would either come from `react-native` or `@react-native-community/async-storage` depending on where you get it from
//   .configure() // controls connection & communication settings
//   .useReactNative() // add all built-in react native plugins
//   .connect(); // let's connect!

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
  const getMoreData = () => {
    if (states.loading) {
      return;
    }
    setStates((prev) => ({...prev, loading: true}));
    let tags = [...arrayTags];
    tags = tags.join(' ');
    fetchImage({page, limit, tags}).then((result) => {
      setData((prevData) => [...prevData, ...result]);
      setStates((prev) => ({
        ...prev,
        loading: false,
        refreshing: false,
      }));
      setParams((prev) => ({...prev, page: prev.page + 1}));
    });
  };

  const refreshData = async () => {
    if (states.refreshing) {
      return;
    }
    setStates((prev) => ({...prev, refreshing: true}));
    let tags = [...arrayTags];
    tags = tags.join(' ');
    fetchImage({limit, tags, page: 1}).then((result) => {
      setData(result);
      setStates((prev) => ({
        ...prev,
        loading: false,
        refreshing: false,
      }));
      setParams((prev) => ({...prev, page: prev.page + 1}));
    });
    // result = result.map((element) => {
    //     return {
    //       large_file_url: element.large_file_url,
    //       preview_file_url: element.preview_file_url,
    //     };
    //   });
  };

  return {data, getMoreData, states, refreshData};
}
