import {Actions, ParamsType} from './context';

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
