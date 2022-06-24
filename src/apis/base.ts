import axios from 'axios';
import { transformSnake } from '../utils/transform';

interface GeneralReq {
  userId: number;
}

interface GeneralRes {
  cause: number;
}

const service = axios.create({
  baseURL: 'http://82.156.172.158:8080/',
  headers: {
    'Content-Type': 'application/json',
  },
  transformRequest: [
    data => {
      return JSON.stringify(transformSnake(data));
    },
  ],
});

axios.interceptors.request.use(
  config => {
    return config;
  },
  error => {
    return Promise.resolve(error);
  },
);

service.interceptors.response.use(
  response => {
    const successResp = {
      status: response.status,
      data: response.data,
    };
    return successResp;
  },
  error => {
    const errorResp = {
      status: error.response.status,
      message: error.message,
    };
    return Promise.resolve(errorResp);
  },
);

export type { GeneralReq, GeneralRes };

export { service };
