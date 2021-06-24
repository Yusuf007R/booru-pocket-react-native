import {request} from '../utils/request';

const autoCompleteRequest = async (query: string) => {
  try {
    const data = await request({
      method: 'get',
      url: '/autocomplete.json',
      params: {
        'search[query]': query,
        'search[type]': 'tag_query',
        limit: 5,
      },
    });

    return data.data;
  } catch (err) {
    return err;
  }
};
export default autoCompleteRequest;
