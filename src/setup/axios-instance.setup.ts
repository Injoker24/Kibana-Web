import Axios, {
  AxiosInstance, AxiosError,
} from 'axios';

import {
  uuid, scrambleJwt
} from 'utils';

import {
  currentLanguage
} from 'storages';

const axiosInstance: AxiosInstance = Axios.create({
  baseURL: process.env.REACT_APP_API_HOSTNAME,
  timeout: Number(process.env.REACT_APP_API_TIMEOUT),
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json; charset=utf-8',
    'Accept-Language': currentLanguage.get()
  }
});

//#region Interceptors
const appType = process.env.REACT_APP_CHANNEL || '';

axiosInstance.interceptors.request.use(
  request => {
    request.headers['X-OID'] = uuid();
    request.headers['X-Channel'] = scrambleJwt(appType)
    return request;
  }
);

axiosInstance.interceptors.response.use(
  response => response,
  (error: AxiosError) => {
    console.error(error.toJSON());
    // timeout
    if (!error.response) {
      return Promise.reject({
        status: 504,
        data: {
          error_schema: {
            fatal_error_flag: false,
            // message: error.message
            message: 'Gangguan sistem. Ulangi beberapa saat lagi.'
          }
        }
      });
    }

    const { status, data } = error.response;
    return Promise.reject({ status, data });
  }
);
//#endregion

export default axiosInstance;