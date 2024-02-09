import Axios, { AxiosInstance, AxiosError } from 'axios';

import { getLocalStorage, uuid } from 'utils';

import { HttpStatus, ErrorCode } from 'enums';

const axiosInstance: AxiosInstance = Axios.create({
  baseURL: process.env.REACT_APP_API_HOSTNAME,
  timeout: Number(process.env.REACT_APP_API_TIMEOUT),
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json; charset=utf-8',
  },
});

axiosInstance.interceptors.request.use((request) => {
  if (getLocalStorage('token')) {
    request.headers['X-Token'] = getLocalStorage('token');
  }
  return request;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    console.error(error.toJSON());
    // timeout
    if (!error.response) {
      return Promise.reject({
        status: HttpStatus.Timeout,
        code: String(HttpStatus.Timeout),
        message: 'Gangguan sistem. Ulangi beberapa saat lagi.',
      });
    }

    try {
      const {
        status,
        data: {
          error_schema: { error_code, error_message },
        },
      } = error.response as {
        status: number;
        data: any;
      };

      return Promise.reject({
        status,
        code: String(error_code),
        message: error_message,
      });
    } catch (error) {
      return Promise.reject({
        status: HttpStatus.Error,
        code: ErrorCode.GeneralError,
        message: 'Gangguan sistem. Ulangi beberapa saat lagi.',
      });
    }
  },
);

export default axiosInstance;
