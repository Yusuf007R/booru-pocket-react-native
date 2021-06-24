import React, {useReducer} from 'react';
import {ParamsContext} from './context';
import {reducer} from './reducer';

const ParamsContextProvider: React.FC<null> = ({children}) => {
  const [params, paramsDispatch] = useReducer(reducer, {
    page: 1,
    limit: 30,
    arrayTags: [],
    safe: true,
  });

  return (
    <ParamsContext.Provider value={{params, paramsDispatch}}>
      {children}
    </ParamsContext.Provider>
  );
};

export default ParamsContextProvider;
