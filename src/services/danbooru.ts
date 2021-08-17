import {
  authType,
  AutoCompleteType,
  Data,
  Params,
  UserDanbooruType,
} from './danbooru.types';
import Axios from 'axios';
import {baseUrl, SafebaseUrl} from '../config/index';
import {UserType} from '../contexts/userContext/context';
import {OptionType} from '../components/NavBar/PopularNavBar';
import parseData from '../utils/parseData';

export class DanBooru {
  auth!: authType;

  request = Axios.create({
    baseURL: baseUrl,
    timeout: 1500,
  });

  safeMode = (safe: boolean) => {
    this.request.defaults.baseURL = safe ? SafebaseUrl : baseUrl;
  };

  fetchImage = async (params: Params, safe: boolean): Promise<Data[]> => {
    this.safeMode(safe);
    const urlParams = new URLSearchParams(params as any);
    try {
      const data = await this.request({
        method: 'get',
        url: '/posts.json',
        auth: this.auth ? this.auth : undefined,
        params: urlParams,
      });

      const temp = parseData(data.data);

      return temp;
    } catch (err) {
      throw new Error(err);
    }
  };

  getUserInfo = async ({
    username,
    apiKey,
  }: UserType): Promise<UserDanbooruType> => {
    try {
      const data = await this.request({
        method: 'get',
        url: '/profile.json',
        auth: {username, password: apiKey},
      });
      return data.data;
    } catch (err) {
      throw new Error(err);
    }
  };

  autoCompleteRequest = async (query: string): Promise<AutoCompleteType[]> => {
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
      throw new Error(err);
    }
  };

  fetchPopularImage = async (
    params: {
      date: string;
      scale: OptionType;
      page: number;
      limit: number;
    },
    safe: boolean,
  ): Promise<Data[]> => {
    try {
      this.safeMode(safe);
      const data = await this.request({
        method: 'get',
        url: '/explore/posts/popular.json',
        auth: this.auth ? this.auth : undefined,
        params: params,
      });
      return parseData(data.data);
    } catch (err) {
      throw new Error(err);
    }
  };

  setAuth = (auth: authType) => {
    this.auth = auth;
  };
}
