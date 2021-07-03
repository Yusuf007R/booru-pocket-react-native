import Axios from 'axios';
import {baseUrl} from '../config/index';

export const request = Axios.create({
  baseURL: baseUrl,
  timeout: 1500,
});
