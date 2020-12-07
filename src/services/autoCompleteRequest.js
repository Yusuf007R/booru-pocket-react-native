import {request} from '../utils/request';

const autoCompleteRequest = async (tags) => {
  try {
    const data = await request({
      method: 'get',
      url: '/tags/autocomplete.json',
      params: {
        'search[name_matches]': tags,
        limit: 5,
      },
    });
    // console.log(data.data);
    return data.data;
  } catch (err) {
    return err;
  }
};
export default autoCompleteRequest;
