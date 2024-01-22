import {
  AuthLoginInput,
  AuthLoginOutput,
  transformToAuthLoginOutput,
  transformToAuthLoginRequest,
} from 'models';

import { ApiResponse, AuthLoginResponse } from 'services/schemas';

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
};

export default AuthService;
