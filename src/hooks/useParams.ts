import {useReducer} from 'react';
import {GalleryTypes} from '../router';

export type ParamsType = {
  page: number;
  arrayTags: string[];
};
export type useParamsType = {
  params: ParamsType;
  paramsDispatch: React.Dispatch<Actions>;
};

export type Actions =
  | {type: 'incrementPage'}
  | {type: 'resetPage'}
  | {type: 'changeTags'; payload: string[]};

export const reducer = (state: ParamsType, action: Actions): ParamsType => {
  switch (action.type) {
    case 'incrementPage':
      return {...state, page: state.page + 1};
    case 'resetPage':
      return {...state, page: 1};
    case 'changeTags':
      return {...state, arrayTags: [...action.payload]};
    default:
      return state;
  }
};

export default function useParams(routeParams: GalleryTypes): useParamsType {
  let arrayTags: string[] = [];
  if (routeParams && routeParams.tags) {
    arrayTags = arrayTags.concat(routeParams.tags);
  }

  const [params, paramsDispatch] = useReducer(reducer, {
    page: 1,
    arrayTags,
  });

  return {params, paramsDispatch};
}
