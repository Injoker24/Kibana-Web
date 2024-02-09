import {
  AuthLoginInput,
  AuthLoginOutput,
  AuthRegisterInput,
  AuthRegisterOutput,
  transformToAuthLoginOutput,
  transformToAuthLoginRequest,
  transformToAuthRegisterOutput,
  transformToAuthRegisterRequest,
} from 'models';

import { ApiResponse, AuthLoginResponse, AuthRegisterResponse } from 'services/schemas';

import { axiosInstance } from 'setup';

const AuthService = {
  login: async (data: AuthLoginInput): Promise<AuthLoginOutput> => {
    const requestData = transformToAuthLoginRequest(data);
    const response = await axiosInstance.post<ApiResponse<AuthLoginResponse>>(
      `/login`,
      requestData,
    );

    return transformToAuthLoginOutput(response.data.output_schema);
  },

  register: async (data: AuthRegisterInput): Promise<AuthRegisterOutput> => {
    const requestData = transformToAuthRegisterRequest(data);
    const response = await axiosInstance.post<ApiResponse<AuthRegisterResponse>>(
      `/register`,
      requestData,
    );

    return transformToAuthRegisterOutput(response.data.output_schema);
  },

  logout: async (): Promise<{}> => {
    const response = await axiosInstance.get<ApiResponse<{}>>(`/logout`);

    return response.data.output_schema;
  },
};

export default AuthService;
