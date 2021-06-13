import {request} from '../utils/request';

const autoCompleteRequest = async (tags) => {
  try {
    const data = await request({
      method: 'get',
      url: '/autocomplete.json',
      params: {
        'search[query]': tags,
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
