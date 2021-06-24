import React from 'react';

export type ParamsType = {
  page: number;
  limit: number;
  arrayTags: string[];
  safe: boolean;
};
export type ParamContext = {
  params: ParamsType;
  paramsDispatch: React.Dispatch<Actions>;
};

export type Actions =
  | {type: 'incrementPage'}
  | {type: 'resetPage'}
  | {type: 'toggleSafeMode'}
  | {type: 'addTag'; payload: string[]}
  | {type: 'removeTag'; payload: number};

const initialState: ParamContext = {
  params: {page: 1, limit: 30, arrayTags: [], safe: true},
  paramsDispatch: () => undefined,
};

export const ParamsContext = React.createContext<ParamContext>(initialState);
