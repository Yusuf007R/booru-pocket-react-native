import {request} from '../utils/request';

const fetchImage = async (params) => {
  // console.log(params);
  const urlParams = new URLSearchParams(params);
  try {
    const data = await request({
      method: 'get',
      url: '/posts.json',
      params: urlParams,
    });
    return data.data;
  } catch (err) {
    return err;
  }
};
export default fetchImage;
