import {DataProvider} from 'recyclerlistview';

export const dataProviderMaker = (data) =>
  new DataProvider((r1, r2) => r1.id !== r2.id).cloneWithRows(data);
