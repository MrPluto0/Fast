import axios from 'axios';
import AppConfig from '../config/setting';
import { transformCamel, transformSnake } from '../utils/transform';

interface GeneralReq {
  userId: number;
}

interface GeneralRes {
  cause: number;
}

const service = axios.create({
  baseURL: AppConfig.ServerHost,
  headers: {
    'Content-Type': 'application/json',
  },
});

service.interceptors.request.use(
  request => {
    request.data = transformSnake(request.data);
    return request;
  },
  error => {
    return Promise.resolve(error);
  },
);

service.interceptors.response.use(
  response => {
    const successResp = {
      status: response.status,
      data: transformCamel(response.data),
    };
    return successResp;
  },
  error => {
    const errorResp = {
      status: error.response.status,
      message: error.message,
      data: transformCamel(error.response?.data),
    };
    console.debug(error.request.responseURL);
    console.log(JSON.stringify(errorResp, null, 4));
    return errorResp;
  },
);

export type { GeneralReq, GeneralRes };

export { service };
