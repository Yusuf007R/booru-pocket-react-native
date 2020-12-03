import {create} from 'axios';
import {baseUrl} from '../config/index';

export const request = create({
  baseURL: baseUrl,
  timeout: 1500,
});
