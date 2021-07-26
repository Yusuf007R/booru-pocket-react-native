import {authType, Data, Params} from './danbooru.types';
import Axios from 'axios';
import {baseUrl} from '../config/index';

export class DanBooru {
  auth!: authType;

  request = Axios.create({
    baseURL: baseUrl,
    timeout: 1500,
  });

  fetchImage = async (params: Params): Promise<Data[]> => {
    const urlParams = new URLSearchParams(params as any);
    try {
      const data = await this.request({
        method: 'get',
        url: '/posts.json',
        auth: this.auth ? this.auth : undefined,
        params: urlParams,
      });
      return data.data;
    } catch (err) {
      return err;
    }
  };

  autoCompleteRequest = async (query: string) => {
    try {
      const data = await this.request({
        method: 'get',
        url: '/autocomplete.json',
        auth: this.auth ? this.auth : undefined,
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

  setAuth = (auth: authType) => {
    this.auth = auth;
  };
}
