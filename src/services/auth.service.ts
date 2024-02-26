import {
  AuthLoginInput,
  AuthLoginOutput,
  AuthRegisterFreelancerInput,
  AuthRegisterInput,
  AuthRegisterOutput,
  transformToAuthLoginOutput,
  transformToAuthLoginRequest,
  transformToAuthRegisterOutput,
  transformToAuthRegisterRequest,
} from 'models';

import {
  ApiResponse,
  AuthLoginResponse,
  AuthRegisterResponse,
  transformToAuthRegisterFreelancerRequest,
} from 'services/schemas';

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

  registerFreelancer: async (data: AuthRegisterFreelancerInput): Promise<{}> => {
    const requestData = transformToAuthRegisterFreelancerRequest(data);

    let formData = new FormData();
    if (requestData.cv) {
      formData.append('cv', requestData.cv);
    }

    if (requestData.portfolio) {
      formData.append('portfolio', requestData.portfolio);
    }

    const blob = new Blob([JSON.stringify(requestData)], {
      type: 'application/json',
    });
    formData.append('data', blob);

    const response = await axiosInstance.post<ApiResponse<{}>>(`/register-freelancer`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data.output_schema;
  },
};

export default AuthService;
