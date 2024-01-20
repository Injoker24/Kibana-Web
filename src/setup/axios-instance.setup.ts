import Axios, { AxiosInstance, AxiosError } from 'axios';

import { uuid } from 'utils';

import { FatalErrorCodeV2, HttpStatus, NonFatalErrorCodeV2 } from 'enums';

const axiosInstance: AxiosInstance = Axios.create({
  baseURL: process.env.REACT_APP_API_HOSTNAME,
  timeout: Number(process.env.REACT_APP_API_TIMEOUT),
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json; charset=utf-8',
  },
});

axiosInstance.interceptors.request.use((request) => {
  request.headers['X-OID'] = uuid();
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
        shouldExit: false,
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
        message: error_message['indonesian'],
        shouldExit: Object.values(FatalErrorCodeV2).includes(error_code),
      });
    } catch (error) {
      return Promise.reject({
        status: HttpStatus.Error,
        code: NonFatalErrorCodeV2.GeneralError,
        message: 'Gangguan sistem. Ulangi beberapa saat lagi.',
        shouldExit: false,
      });
    }
  },
);
//#endregion

export default axiosInstance;
