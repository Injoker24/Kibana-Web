import Axios, { AxiosInstance, AxiosError } from 'axios';

import { uuid, scrambleJwt } from 'utils';

import { currentLanguage } from 'storages';
import { FatalErrorCodeV2, HttpStatus, NonFatalErrorCodeV2 } from 'enums';

const axiosInstanceV2: AxiosInstance = Axios.create({
  baseURL: process.env.REACT_APP_API_HOSTNAME,
  timeout: Number(process.env.REACT_APP_API_TIMEOUT),
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json; charset=utf-8',
    'Accept-Language': currentLanguage.get(),
  },
});

//#region Interceptors
const appType = process.env.REACT_APP_CHANNEL || '';

axiosInstanceV2.interceptors.request.use((request) => {
  request.headers['X-OID'] = uuid();
  request.headers['X-Channel'] = scrambleJwt(appType);
  return request;
});

axiosInstanceV2.interceptors.response.use(
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
        // If error is non fatal, set to false, else set to true
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

export default axiosInstanceV2;
