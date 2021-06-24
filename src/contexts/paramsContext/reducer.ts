import {Actions, ParamsType} from './context';

export const reducer = (state: ParamsType, action: Actions): ParamsType => {
  switch (action.type) {
    case 'incrementPage':
      return {...state, page: state.page + 1};
    case 'resetPage':
      return {...state, page: 1};
    case 'toggleSafeMode':
      return {...state, safe: state.safe};
    case 'addTag':
      return {...state, arrayTags: [...state.arrayTags, ...action.payload]};
    case 'removeTag': {
      const tempParams = state.arrayTags.filter((_element, filterIndex) => {
        return filterIndex !== action.payload;
      });
      return {...state, arrayTags: tempParams};
    }
    default:
      return state;
  }
};
