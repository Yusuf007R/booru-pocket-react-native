import React, {useEffect, useState} from 'react';
import {ParamsContext} from './context';

export default function ParamsContextProvider({children}) {
  const [params, setParams] = useState({
    page: 1,
    limit: 30,
    arrayTags: [],
    safe: true,
  });
  const [inputArray, setInputArray] = useState([]);

  // const onChange = () => {};

  return (
    <ParamsContext.Provider value={{params, setParams}}>
      {children}
    </ParamsContext.Provider>
  );
}
