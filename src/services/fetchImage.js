import {request} from '../utils/request';

const fetchImage = async (params) => {
  console.log(params);
  try {
    const data = await request({
      method: 'get',
      url: '/posts.json',
      params: {
        limit: params.limit,
        page: params.page,
        tag: '',
      },
    });
    // console.log(data.config);
    return data.data;
  } catch (err) {
    return err;
  }
};
export {fetchImage};
